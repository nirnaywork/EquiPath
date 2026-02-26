import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export async function POST(req: Request) {
    try {
        const { action, email, eventName, date } = await req.json();

        if (action === "confirm" && email) {
            // Send immediate confirmation
            const subject = `Reminder Set: ${eventName}`;
            const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8B5CF6;">EquiPath Reminder Confirmed</h2>
          <p>Hi there,</p>
          <p>You have successfully set a reminder for <strong>${eventName}</strong>.</p>
          <p>Deadline: <strong>${new Date(date).toDateString()}</strong></p>
          <p>We'll send you another email exactly one day before this date to make sure you're prepared!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">EquiPath - Your Free CS Career Launchpad</p>
        </div>
      `;

            const result = await sendEmail(email, subject, html);
            return NextResponse.json({ success: true, result });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error: unknown) {
        console.error("Reminders API POST Error:", error);
        return NextResponse.json({ error: "Failed to process reminder request" }, { status: 500 });
    }
}

// CRON JOB ENDPOINT
// Setup in Vercel to hit this endpoint daily or hourly
export async function GET(req: Request) {
    try {
        // Basic security token to prevent unauthorized access to this endpoint
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
            return new Response('Unauthorized', { status: 401 });
        }

        // Calculate tomorrow's date string YYYY-MM-DD
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        const q = query(
            collection(db, "reminders"),
            where("date", "==", tomorrowStr),
            where("emailSent", "==", false)
        );

        const snapshot = await getDocs(q);
        const emailsSent = [];

        for (const document of snapshot.docs) {
            const data = document.data();
            const subject = `ACTION REQUIRED: Upcoming Deadline for ${data.eventName}`;
            const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; border-top: 5px solid #ef4444;">
          <h2 style="color: #ef4444;">Deadline Alert!</h2>
          <p>Hi there,</p>
          <p>This is your 24-hour warning for <strong>${data.eventName}</strong>.</p>
          <p>Date: <strong>${new Date(data.date).toDateString()}</strong></p>
          ${data.notes ? `<div style="background: #f9fafb; padding: 10px; border-radius: 5px; margin: 15px 0;"><p style="margin:0;"><em>Notes: ${data.notes}</em></p></div>` : ''}
          <p>Make sure you have everything ready!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">EquiPath - Your Free CS Career Launchpad</p>
        </div>
      `;

            if (data.userEmail) {
                await sendEmail(data.userEmail, subject, html);
                await updateDoc(doc(db, "reminders", document.id), { emailSent: true });
                emailsSent.push(data.userEmail);
            }
        }

        return NextResponse.json({
            success: true,
            processed: snapshot.size,
            emailsSent
        });
    } catch (error: unknown) {
        console.error("Reminders API GET (Cron) Error:", error);
        return NextResponse.json({ error: "Failed to run cron job" }, { status: 500 });
    }
}

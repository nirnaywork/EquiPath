import { NextResponse } from "next/server";

// To make this secure, Vercel sets cron headers. Or you can require a simple hardcoded secret query param.
// E.g., /api/cron/process-reminders?secret=YOUR_CRON_SECRET

export async function GET(req: Request) {
    // Basic Security Check
    const authHeader = req.headers.get("authorization");
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    // This checks either a Bearer token (Vercel cron syntax) or a secret query param for manual triggering
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && secret !== process.env.CRON_SECRET) {
        if (process.env.NODE_ENV === "production") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    try {
        console.log(`[CRON] Starting reminder processing at ${new Date().toISOString()}`);

        /*
            When implementing true Firebase backend writes across all users, we should use firebase-admin.
            For now, as requested, this is the mock engine logic layout.
            You would uncomment & use 'firebase-admin' like so:
            
            import * as admin from 'firebase-admin';
            if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(...) });
            
            const db = admin.firestore();
            const usersSnap = await db.collection("users").get();
        */

        const mockedEvents = [
            { id: "e1", title: "Data Structures Final", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), remindersSent: { "1w": false } },
            { id: "e2", title: "Microsoft Intern Deadline", date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), remindersSent: { "3d": false } },
            { id: "e3", title: "OS Assignment", date: new Date(Date.now() + 24 * 60 * 60 * 1000), remindersSent: { "1d": false } },
        ];

        let remindersSentCount = 0;

        for (const event of mockedEvents) {
            const now = new Date();
            const diffDays = (event.date.getTime() - now.getTime()) / (1000 * 3600 * 24);

            // 1 Week Reminder
            if (diffDays <= 7 && diffDays > 3 && !event.remindersSent["1w"]) {
                console.log(`[EMAIL DISPATCH] Mock sending 1-Week Warning for: ${event.title}`);
                // await sendEmail(user.email, event.title, "1 week away");
                remindersSentCount++;
            }
            // 3 Day Reminder
            else if (diffDays <= 3 && diffDays > 1 && !event.remindersSent["3d"]) {
                console.log(`[EMAIL DISPATCH] Mock sending 3-Day Warning for: ${event.title}`);
                // await sendEmail(user.email, event.title, "3 days away");
                remindersSentCount++;
            }
            // 1 Day Reminder
            else if (diffDays <= 1 && diffDays > 0 && !event.remindersSent["1d"]) {
                console.log(`[EMAIL DISPATCH] Mock sending 1-Day Warning for: ${event.title}`);
                // await sendEmail(user.email, event.title, "Tomorrow!");
                remindersSentCount++;
            }
        }

        return NextResponse.json({
            status: "success",
            message: "Batch complete",
            processedCount: mockedEvents.length,
            remindersSent: remindersSentCount
        });

    } catch (error: any) {
        console.error("Cron Processing Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

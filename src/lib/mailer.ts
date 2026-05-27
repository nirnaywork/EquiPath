import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendEmail(to: string, subject: string, html: string) {
    try {
        const info = await transporter.sendMail({
            from: `"EquiPath" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html,
        });
        return { success: true as const, info };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false as const, error };
    }
}

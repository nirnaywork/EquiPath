import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile, tasks, userEmail } = body;

    if (!profile || !tasks) {
      return NextResponse.json({ error: "Missing profile or tasks data" }, { status: 400 });
    }

    // --- SMART NUDGES LOGIC ---
    // Fire-and-forget stale task nudges (Stale meaning: To Do, High/Urgent, > 48 hours sitting)
    if (userEmail && Array.isArray(tasks)) {
      tasks.forEach(async (task) => {
        if (task.status === "To Do" && (task.priority === "High" || task.priority === "Urgent")) {
          // Try parsing ID back to timestamp since KanbanBoard generates Date.now().toString()
          const createdAt = parseInt(task.id);
          if (!isNaN(createdAt)) {
            const ageInHours = (Date.now() - createdAt) / (1000 * 60 * 60);
            if (ageInHours > 48) {
              try {
                await sendEmail(
                  userEmail,
                  `Hey, don't forget: ${task.name} is due soon!`,
                  `<p>Your <strong>${task.priority}</strong> priority task "<strong>${task.name}</strong>" (${task.category}) has been sitting in your To-Do list for a while.</p><p>Let's knock it out today!</p>`
                );
              } catch (e) {
                console.error("Failed to send nudge email:", e);
              }
            }
          }
        }
      });
    }
    // --------------------------

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a smart academic scheduler for a CS student. Based on their available hours per day, free days, current focus areas, specific goals, and their task list with priorities and deadlines — generate a realistic, optimized daily schedule for the next 7 days starting from today.

PROFILE:
Year: ${profile.year}
Hours per day: ${profile.hoursPerDay}
Free Days: ${profile.freeDays.join(", ")}
Focus Areas: ${profile.focusAreas.join(", ")}
Specific Goals: ${profile.specificGoals || 'None specified'}

TASKS LOG:
${JSON.stringify(tasks, null, 2)}

INSTRUCTIONS:
Distribute tasks intelligently: high-priority and urgent tasks earlier in the week, lighter tasks on busy days, and always leave buffer time. Never overload a single day. Factor in mental fatigue — do not schedule more than 2 hours of DSA or intense coding back to back without a break slot. 

Return strictly valid JSON matching this exact structure:
{
  "schedule": [
    {
      "day": "Monday",
      "date": "YYYY-MM-DD",
      "total_study_hours": 4,
      "slots": [
        {
          "time": "10:00 AM – 11:30 AM",
          "task": "Task name here",
          "category": "DSA Practice",
          "priority": "High",
          "tip": "Short AI tip for this session e.g. Focus on time complexity today"
        }
      ],
      "rest_periods": ["12:00 PM – 12:30 PM", "3:00 PM – 3:15 PM"],
      "daily_quote": "A short motivational line for the day"
    }
  ],
  "weekly_summary": "AI's brief overview of the week's plan and what the student should focus on most.",
  "burnout_warning": "If the student's load looks too heavy, return a genuine warning here, else return null"
}
        `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const responseText = result.response.text();
    const parsedJson = JSON.parse(responseText);

    return NextResponse.json(parsedJson);

  } catch (error: any) {
    console.error("Gemini API Error (Scheduler):", error);
    return NextResponse.json({
      error: "Failed to generate schedule from server",
      details: error.message
    }, { status: 500 });
  }
}

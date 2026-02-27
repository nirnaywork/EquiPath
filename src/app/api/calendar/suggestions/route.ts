import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.DEEPSEEK_API_KEY || "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";

        let requestData: { events?: any[], timezone?: string } = {};
        try {
            requestData = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { events, timezone } = requestData;

        if (!events || !Array.isArray(events)) {
            return NextResponse.json({ error: "Missing or invalid events array" }, { status: 400 });
        }

        if (events.length === 0) {
            return NextResponse.json({
                suggestions: [
                    { title: "Quiet Week Ahead", description: "No upcoming deadlines. Take this time to rest or get ahead on long-term projects.", priority: "low" }
                ]
            });
        }

        const systemInstruction = `You are a strict, efficient, and highly intelligent Academic AI Assistant. Your job is to look at a student's upcoming calendar events and provide 1-3 actionable insights to prevent last-minute panic. 
Keep suggestions extremely concise, direct, and actionable. Do not add fluff.
Return exactly this JSON structure: { "suggestions": [ { "title": "string", "description": "string", "priority": "low | medium | high | critical" } ] }`;

        const prompt = `Current Timezone: ${timezone || "UTC"}\nCurrent Date ISO: ${new Date().toISOString()}\nUpcoming Events (JSON):\n${JSON.stringify(events, null, 2)}\n\nAnalyze these events. Look for clustering (e.g., 3 exams in a week), high-priority deadlines approaching, or low syllabus coverage on soon-to-be exams. Generate 1-3 highly specific, panic-preventing suggestions based ONLY on this schedule.`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat",
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.6,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Deepseek Suggestions API Error:", response.status, errorText);

            // Check for rate limit error from OpenRouter
            if (response.status === 429) {
                return NextResponse.json(
                    { error: "Daily AI limit reached. Insights will be back after your quota resets.", quotaExceeded: true },
                    { status: 429 }
                );
            }
            throw new Error(`API returned status ${response.status}`);
        }

        const resultData = await response.json();
        const text = resultData.choices?.[0]?.message?.content;

        if (!text) {
            throw new Error("No text returned from API");
        }

        try {
            const parsed = JSON.parse(text);
            return NextResponse.json(parsed);
        } catch {
            console.error("Failed to parse Deepseek output as JSON", text);
            return NextResponse.json({ error: "Invalid response format from AI" }, { status: 500 });
        }
    } catch (error: unknown) {
        console.error("Suggestions API Error:", error);
        return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 });
    }
}

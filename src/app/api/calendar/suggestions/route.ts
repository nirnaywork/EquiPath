import { NextResponse } from "next/server";

const HIGH_DEMAND_MSG = "Our AI is experiencing high demand at the moment — please check back in a few hours."; // Fixed: consistent user-facing fallback
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
// Fixed: llama3-70b-8192 was decommissioned by Groq; use supported replacements
const MODEL_CANDIDATES = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"] as const;

type SuggestionPriority = "low" | "medium" | "high" | "critical";

type InputEvent = {
    title?: string;
    type?: string;
    date?: string;
    priority?: string;
    metadata?: unknown;
};

type SuggestionsRequest = {
    events?: InputEvent[];
    timezone?: string;
};

async function callGroqJson(messages: { role: "system" | "user"; content: string }[]): Promise<unknown> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GROQ_API_KEY");
    }

    const payloadBase = {
        messages,
        response_format: { type: "json_object" as const },
        temperature: 0.6,
    };

    const attempt = async (model: string) => {
        const res = await fetch(GROQ_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payloadBase, model }),
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            const err = new Error(`Groq API returned ${res.status}: ${text}`);
            (err as any).status = res.status;
            throw err;
        }

        return res.json() as Promise<any>;
    };

    let lastError: unknown = null;
    for (const model of MODEL_CANDIDATES) {
        try {
            const data = await attempt(model);
            const content: unknown = data?.choices?.[0]?.message?.content;
            if (typeof content !== "string" || !content.trim()) throw new Error(`No content returned from Groq (${model})`);
            return JSON.parse(content);
        } catch (err: unknown) {
            lastError = err;
            continue;
        }
    }

    throw lastError ?? new Error("Groq request failed");
}

export async function POST(req: Request) {
    try {
        let requestData: SuggestionsRequest = {};
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
                    { title: "Quiet Week Ahead", description: "No upcoming deadlines. Take this time to rest or get ahead on long-term projects.", priority: "low" satisfies SuggestionPriority }
                ]
            });
        }

        const systemInstruction = `You are a strict, efficient, and highly intelligent Academic AI Assistant. Your job is to look at a student's upcoming calendar events and provide 1-3 actionable insights to prevent last-minute panic. 
Keep suggestions extremely concise, direct, and actionable. Do not add fluff.
Return exactly this JSON structure: { "suggestions": [ { "title": "string", "description": "string", "priority": "low | medium | high | critical" } ] }`;

        const prompt = `Current Timezone: ${timezone || "UTC"}\nCurrent Date ISO: ${new Date().toISOString()}\nUpcoming Events (JSON):\n${JSON.stringify(events, null, 2)}\n\nAnalyze these events. Look for clustering (e.g., 3 exams in a week), high-priority deadlines approaching, or low syllabus coverage on soon-to-be exams. Generate 1-3 highly specific, panic-preventing suggestions based ONLY on this schedule.`;

        const parsed = await callGroqJson([
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt },
        ]);

        return NextResponse.json(parsed);
    } catch (error: unknown) {
        console.error("Suggestions API Error:", error);
        // Fixed: user-friendly message for any Groq failure
        return NextResponse.json({ error: HIGH_DEMAND_MSG }, { status: 503 });
    }
}

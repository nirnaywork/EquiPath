import { NextResponse } from "next/server";
import { getDomainContext } from "@/lib/masterPrompt";

const HIGH_DEMAND_MSG = "Our AI is experiencing high demand at the moment — please check back in a few hours."; // Fixed: consistent user-facing fallback
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
// Fixed: llama3-70b-8192 was decommissioned by Groq; use supported replacements
const MODEL_CANDIDATES = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"] as const;

type RoadmapRequest = { year?: string; domain?: string };

function buildVariationSeed(): string {
    // Fixed: encourage unique major project each generation without storing state
    const now = new Date();
    const daySeed = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
    const nonce = Math.random().toString(36).slice(2, 9);
    return `${daySeed}:${nonce}`;
}

async function callGroqJson(messages: { role: "system" | "user"; content: string }[], temperature = 0.5): Promise<unknown> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");

    const payloadBase = {
        messages,
        response_format: { type: "json_object" as const },
        temperature,
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
            const status = (err as any)?.status;
            // Fixed: if it's a client error other than rate-limit, keep trying other models (model deprecation shows up as 400)
            if (typeof status === "number" && status >= 500) continue;
            continue;
        }
    }

    throw lastError ?? new Error("Groq request failed");
}

function hasGenericProjects(payload: unknown): boolean {
    if (!payload || typeof payload !== "object") return false;
    const topics = (payload as any).topics_to_learn;
    if (!Array.isArray(topics)) return false;
    const banned = /(to-?do|todo|calculator|weather app)/i;
    for (const t of topics) {
        const minors = t?.minor_projects;
        if (!Array.isArray(minors)) continue;
        for (const p of minors) {
            const title = typeof p?.title === "string" ? p.title : "";
            if (banned.test(title)) return true;
        }
    }
    return false;
}

export async function POST(req: Request) {
    let requestData: RoadmapRequest = {};
    try {
        requestData = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { year, domain } = requestData;

    if (!year || !domain) {
        return NextResponse.json({ error: "Missing year or domain" }, { status: 400 });
    }

    if (domain === "Not Sure") {
        return NextResponse.json({
            status: "explore",
            suggestions: [
                {
                    domain_name: "AI/ML",
                    pitch: "Build intelligent systems that learn from data. One of the highest paying fields in tech with applications in every industry.",
                    beginner_friendly: false,
                    avg_india_salary: "₹8L–25L/year",
                    time_to_job_ready: "12–18 months"
                },
                {
                    domain_name: "UI/UX Design",
                    pitch: "Shape how millions of people experience technology. Creative and analytical, with growing demand in every product company.",
                    beginner_friendly: true,
                    avg_india_salary: "₹5L–18L/year",
                    time_to_job_ready: "6–10 months"
                },
                {
                    domain_name: "Cybersecurity",
                    pitch: "Defend the digital world from attackers. Massive talent shortage globally means excellent job security and high salaries.",
                    beginner_friendly: false,
                    avg_india_salary: "₹6L–20L/year",
                    time_to_job_ready: "10–14 months"
                }
            ]
        });
    }

    try {
        const variationSeed = buildVariationSeed();

        const strictSchema = `Return ONLY valid JSON. No markdown. No extra keys. Output must include:
{
  "domain": string,
  "target_year": string,
  "overview": string,
  "roadmap_phases": [
    { "phase": string, "title": string, "topics": string[], "timeframe": string, "milestone": string }
  ],
  "projects": {
    "minor": [{ "title": string, "description": string, "tech_stack": string[] }],
    "major": { "title": string, "description": string, "tech_stack": string[], "features": string[] }
  },
  "topics_to_learn": [
    {
      "topic": string,
      "time_estimate": string,
      "minor_projects": [{ "title": string, "description": string }]
    }
  ],
  "major_project": {
    "title": string,
    "description": string,
    "unique_twist": string,
    "tech_stack": string[],
    "features": string[]
  },
  "free_resources": [{ "name": string, "type": string, "url": string }],
  "risks_and_challenges": string[],
  "internship_strategy": string
}`;

        const domainContext = getDomainContext(domain);

        const system = `You are EquiPath's Expert Career Advisor and Curriculum Designer.
You MUST output ONLY valid JSON (no markdown, no commentary).

Context for the selected domain:
${domainContext}

IMPORTANT:
- You MUST follow this schema exactly (all keys required).
- topics_to_learn must be ordered from beginner to job-ready.
- Each topic must include a realistic time_estimate (days/weeks/months).
- Each topic must include 1-3 minor_projects tightly tied to that topic (no generic apps like to-do lists, calculators, weather apps).
- major_project MUST be unique each generation. Use this seed to vary the concept, target users, and constraints: ${variationSeed}

Schema:
${strictSchema}`;

        const user = `Domain: ${domain}
Target Year: ${year}

Generate a structured roadmap that includes Topics -> Time Estimates -> Minor Projects -> Major Project.`;

        let parsed = await callGroqJson(
            [
                { role: "system", content: system },
                { role: "user", content: user },
            ],
            0.55
        );

        if (hasGenericProjects(parsed)) {
            // Fixed: regenerate once if the model returns generic project ideas
            parsed = await callGroqJson(
                [
                    {
                        role: "system",
                        content:
                            system +
                            "\n\nHARD CONSTRAINT: Any minor project named like To-Do, Calculator, Weather App, or other generic tutorial apps is INVALID. Regenerate with fresh, domain-specific project ideas.",
                    },
                    { role: "user", content: user },
                ],
                0.6
            );
        }

        return NextResponse.json(parsed);
    } catch (error: unknown) {
        console.error("Groq API error:", error);
        // Fixed: user-friendly message for any Groq failure
        return NextResponse.json({ error: HIGH_DEMAND_MSG }, { status: 503 });
    }
}

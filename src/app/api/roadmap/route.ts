import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing from environment variables.");
            return NextResponse.json({ error: "API integration not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const { year, domain } = await req.json();

        if (!year || !domain) {
            return NextResponse.json({ error: "Missing year or domain" }, { status: 400 });
        }

        const isExplore = domain === "Not Sure";

        const systemInstruction = `You are the core intelligence behind EquiPath, a premium free educational platform for CS students. You are an Expert Career Advisor, Technical Mentor, and Curriculum Designer. Tailor all output strictly to the user's Year of study. 1st/2nd years need foundational basics. 3rd/4th years need advanced architecture, portfolio polish, and internship strategies. Project ideas must be unique and resume-worthy — absolutely NO to-do apps, calculators, or weather apps. Free resources must be real and reputable. Risks & Challenges must be brutally honest about the field.`;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction,
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json",
            },
        });

        let prompt = "";
        if (isExplore) {
            prompt = `The user is in their ${year} and is "Not Sure" which domain to pick. Suggest 3 distinct, beginner-friendly domains for them to explore. Return exactly this JSON structure: { "status": "explore", "suggestions": [ { "domain_name": "", "pitch": "", "beginner_friendly": true } ] }`;
        } else {
            prompt = `Create a comprehensive roadmap for a user in their ${year} studying ${domain}. Return exactly this JSON structure: { "status": "roadmap", "domain": "${domain}", "target_year": "${year}", "overview": "", "roadmap_phases": [ { "phase_name": "", "topics_to_learn": [], "estimated_timeframe": "" } ], "free_resources": [ { "name": "", "type": "", "url_or_search_term": "" } ], "projects": { "minor_projects": [ { "title": "", "description": "" } ], "major_project": { "title": "", "description": "", "key_technologies": [] } }, "risks_and_challenges": [], "internship_strategy": "" }`;
        }

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        try {
            const parsed = JSON.parse(text);
            return NextResponse.json(parsed);
        } catch {
            console.error("Failed to parse Gemini output as JSON", text);
            return NextResponse.json({ error: "Invalid response format from AI" }, { status: 500 });
        }
    } catch (error: unknown) {
        console.error("Gemini API Error:", error);
        const msg = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "Failed to generate roadmap", details: msg }, { status: 500 });
    }
}

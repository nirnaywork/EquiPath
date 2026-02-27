import { NextResponse } from "next/server";
import { hardcodedRoadmaps } from "@/lib/hardcodedRoadmaps";

function getFallbackRoadmap(domain: string, year: string) {
    const domainRoadmaps = hardcodedRoadmaps[domain];
    if (domainRoadmaps && domainRoadmaps.length > 0) {
        const randomIndex = Math.floor(Math.random() * domainRoadmaps.length);
        const selectedRoadmap = domainRoadmaps[randomIndex];
        return NextResponse.json({
            ...selectedRoadmap,
            domain: domain,
            target_year: year
        });
    }
    return NextResponse.json(
        { error: "Daily AI limit reached and no fallback available.", quotaExceeded: true },
        { status: 429 }
    );
}

export async function POST(req: Request) {
    let requestData: { year?: string, domain?: string } = {};
    try {
        requestData = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { year, domain } = requestData;

    if (!year || !domain) {
        return NextResponse.json({ error: "Missing year or domain" }, { status: 400 });
    }

    try {
        const apiKey = process.env.DEEPSEEK_API_KEY || "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";
        const isExplore = domain === "Not Sure";

        const systemInstruction = `You are the core intelligence behind EquiPath, a premium free educational platform for CS students. You are an Expert Career Advisor, Technical Mentor, and Curriculum Designer. Tailor all output strictly to the user's Year of study. 1st/2nd years need foundational basics. 3rd/4th years need advanced architecture, portfolio polish, and internship strategies. Project ideas must be unique and resume-worthy — absolutely NO to-do apps, calculators, or weather apps. Free resources must be real and reputable. Risks & Challenges must be brutally honest about the field.`;

        let prompt = "";
        if (isExplore) {
            prompt = `The user is in their ${year} and is "Not Sure" which domain to pick. Suggest 3 distinct, beginner-friendly domains for them to explore. Return exactly this JSON structure: { "status": "explore", "suggestions": [ { "domain_name": "", "pitch": "", "beginner_friendly": true } ] }`;
        } else {
            prompt = `Create a comprehensive roadmap for a user in their ${year} studying ${domain}. Return exactly this JSON structure: { "status": "roadmap", "domain": "${domain}", "target_year": "${year}", "overview": "", "roadmap_phases": [ { "phase_name": "", "topics_to_learn": [], "estimated_timeframe": "" } ], "free_resources": [ { "name": "", "type": "", "url_or_search_term": "" } ], "projects": { "minor_projects": [ { "title": "", "description": "" } ], "major_project": { "title": "", "description": "", "key_technologies": [] } }, "risks_and_challenges": [], "internship_strategy": "" }`;
        }

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
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Deepseek API Error:", response.status, errorText);

            // Trigger fallback for rate limit and other API errors
            return getFallbackRoadmap(domain, year);
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
            return getFallbackRoadmap(domain, year);
        }
    } catch (error: unknown) {
        console.error("Deepseek Integration Error:", error);

        // Use hardcoded roadmaps as fallback for any API error
        return getFallbackRoadmap(domain, year);
    }
}

import { NextResponse } from "next/server";

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

export async function POST(req: Request) {
    try {
        const { domain, skills } = await req.json();

        if (!domain) {
            return NextResponse.json({ error: "Missing domain" }, { status: 400 });
        }

        if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
            console.error("Adzuna API keys are missing");
            return NextResponse.json({ error: "API integration not configured" }, { status: 500 });
        }

        // Build the query string using the domain and optional skills
        const skillParam = skills && skills.length > 0 ? skills.join(" ") : "";
        const whatParam = encodeURIComponent(`${domain} ${skillParam}`.trim());

        // Defaulting to "us" (United States) for broader results, but in a real app this could be a user setting
        const country = "us";

        // Adzuna API requires a country and generic search relies on the 'what' query parameter
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=10&what=${whatParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Adzuna API returned ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({ jobs: data.results || [] });
    } catch (error: unknown) {
        console.error("Jobs API Error:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

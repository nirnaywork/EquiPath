import { NextResponse } from "next/server";

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

const JOBS_CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes
const jobsCache = new Map<string, { jobs: unknown[]; ts: number }>();

function cacheKey(domain: string, skills: string[], country: string, remote: boolean): string {
    return JSON.stringify({ domain, skills: skills?.slice().sort() ?? [], country, remote });
}

export async function POST(req: Request) {
    try {
        const { domain, skills, country = "in", remote = false } = await req.json();

        if (!domain) {
            return NextResponse.json({ error: "Missing domain" }, { status: 400 });
        }

        const key = cacheKey(domain, skills ?? [], country, remote);
        const hit = jobsCache.get(key);
        if (hit && Date.now() - hit.ts < JOBS_CACHE_TTL_MS) {
            return NextResponse.json({ jobs: hit.jobs });
        }

        if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
            console.error("Adzuna API keys are missing");
            return NextResponse.json({ error: "API integration not configured" }, { status: 500 });
        }

        const skillParam = skills && skills.length > 0 ? skills.join(" ") : "";
        const remoteParam = remote ? "remote" : "";
        const whatParam = encodeURIComponent(`${domain} ${skillParam} ${remoteParam}`.trim());

        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=15&what=${whatParam}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Adzuna API returned ${response.status}`);
        }

        const data = await response.json();
        const jobs = data.results || [];
        jobsCache.set(key, { jobs, ts: Date.now() });
        if (jobsCache.size > 100) {
            const oldest = [...jobsCache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0];
            if (oldest) jobsCache.delete(oldest[0]);
        }

        return NextResponse.json({ jobs });
    } catch (error: unknown) {
        console.error("Jobs API Error:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

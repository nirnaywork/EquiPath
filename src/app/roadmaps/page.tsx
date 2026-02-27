"use client";

import { useState } from "react";
import { ChevronRight, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import RoadmapDisplay from "@/components/RoadmapDisplay";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"];

const DOMAINS = [
    "Software Development (Web/Mobile/Desktop)", "AI/ML", "Data Science & Analytics",
    "Cloud Computing", "Cybersecurity", "DevOps & SRE", "Blockchain & Web3",
    "UI/UX Design", "IoT", "AR/VR", "Game Development", "Database & Data Engineering",
    "Networking & Telecom", "Hardware & Embedded Systems", "Robotics & Automation",
    "IT Support & SysAdmin", "QA & Testing", "Tech Product Management"
];

export default function RoadmapsPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [year, setYear] = useState<string | null>(null);
    const [domain, setDomain] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [roadmapData, setRoadmapData] = useState<Record<string, unknown> | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleNextStep = () => {
        if (step === 1 && year) setStep(2);
    };

    const handleGenerate = async (selectedDomain: string) => {
        setDomain(selectedDomain);
        setIsLoading(true);
        setApiError(null);
        setStep(3);

        try {
            const res = await fetch("/api/roadmap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, domain: selectedDomain })
            });

            const data = await res.json();

            if (!res.ok) {
                const message = data.quotaExceeded
                    ? "Daily AI limit reached. Try again tomorrow or check your Gemini API plan."
                    : (data.details || data.error || "Failed to generate roadmap");
                throw new Error(message);
            }

            setRoadmapData(data);
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            console.error("Roadmap error:", msg);
            setApiError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Craft Your <span className="text-accent">Career Path</span>
                </h1>
                <p className="mt-4 text-lg text-foreground/70">
                    AI-powered, highly personalized roadmaps for CS students.
                </p>
            </div>

            {/* Step 1: Select Year */}
            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="mb-6 text-2xl font-bold text-center">What year are you in?</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {YEARS.map((y) => (
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`relative flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-200 backdrop-blur-sm ${year === y
                                    ? "border-accent bg-accent/15 shadow-[0_0_32px_rgba(200,169,110,0.35)] scale-[1.04]"
                                    : "border-white/8 bg-white/3 hover:border-accent/40 hover:bg-white/6 hover:scale-[1.02]"
                                    }`}
                            >
                                {year === y && (
                                    <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                                        <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                )}
                                <div className={`text-lg font-bold transition-colors duration-200 ${year === y ? "text-accent" : "text-foreground/70"}`}>
                                    {y}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleNextStep}
                            disabled={!year}
                            className="flex items-center gap-2 rounded-xl bg-accent px-8 py-4 font-bold text-background transition-transform disabled:opacity-50 disabled:hover:scale-100 hover:scale-105"
                        >
                            Continue <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Select Domain */}
            {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <h2 className="text-2xl font-bold flex-1 text-center pr-16 text-balance">Which domain interests you?</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {DOMAINS.map((d) => (
                            <button
                                key={d}
                                onClick={() => handleGenerate(d)}
                                className="glass rounded-xl p-4 text-left transition-colors hover:border-accent/50 hover:bg-accent/5 focus:border-accent"
                            >
                                <span className="text-sm font-semibold">{d}</span>
                            </button>
                        ))}

                        <button
                            onClick={() => handleGenerate("Not Sure")}
                            className="glass group relative overflow-hidden rounded-xl border-accent/30 p-4 text-left transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(196,154,108,0.3)] focus:border-accent"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:animate-shimmer group-hover:opacity-100" />
                            <div className="relative flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-accent" />
                                <span className="text-sm font-bold text-accent">Not Sure (Explore)</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Loading / Result Area */}
            {step === 3 && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    {isLoading ? (
                        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl" />
                                <Loader2 className="relative h-16 w-16 animate-spin text-accent" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold">Engineering your roadmap...</h3>
                                <p className="mt-2 text-sm text-foreground/60">
                                    Analyzing {year} requirements for {domain}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            {apiError && (
                                <div className="glass rounded-2xl border border-red-500/30 bg-red-500/5 p-6 text-center">
                                    <p className="text-red-400 font-bold mb-2">Generation Failed</p>
                                    <p className="text-sm text-red-300/80 max-w-md mx-auto">{apiError}</p>
                                    <button
                                        onClick={() => { setStep(2); setApiError(null); }}
                                        className="mt-4 text-sm text-accent hover:underline"
                                    >
                                        ← Try again
                                    </button>
                                </div>
                            )}
                            {roadmapData && <RoadmapDisplay data={roadmapData} onReset={() => { setStep(1); setYear(null); setDomain(null); setRoadmapData(null); }} />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

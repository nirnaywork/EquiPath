"use client";

import { useState, useEffect } from "react";
import { ChevronRight, CalendarClock, Sparkles, Loader2 } from "lucide-react";
import KanbanBoard, { Task } from "@/components/scheduler/KanbanBoard";
import ScheduleView, { ScheduleData } from "@/components/scheduler/ScheduleView";
import { auth } from "@/lib/firebase";

export type UserProfile = {
    year: string;
    hoursPerDay: number;
    freeDays: string[];
    focusAreas: string[];
    specificGoals: string;
};

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FOCUS_AREAS = [
    "Roadmap Learning",
    "DSA/Competitive Programming",
    "Internship Prep",
    "Personal Projects",
    "Exam Prep",
    "Skill Building",
];

export default function SchedulerPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Profile Edit State
    const [year, setYear] = useState("");
    const [hours, setHours] = useState(4);
    const [freeDays, setFreeDays] = useState<string[]>([]);
    const [focus, setFocus] = useState<string[]>([]);
    const [goals, setGoals] = useState("");

    // Tasks State
    const [tasks, setTasks] = useState<Task[]>([]);

    // Generation State
    const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsClient(true);
        // We'll load from localStorage or Firebase eventually
        const saved = localStorage.getItem("equipath_scheduler_profile");
        if (saved) {
            try {
                setProfile(JSON.parse(saved));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleSaveProfile = () => {
        if (!year) return alert("Please select your current year.");
        if (freeDays.length === 0) return alert("Please select at least one free day.");
        if (focus.length === 0) return alert("Please select at least one focus area.");

        const newProfile: UserProfile = {
            year,
            hoursPerDay: hours,
            freeDays,
            focusAreas: focus,
            specificGoals: goals,
        };

        setProfile(newProfile);
        localStorage.setItem("equipath_scheduler_profile", JSON.stringify(newProfile));
    };

    const toggleDay = (d: string) => {
        setFreeDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    };

    const toggleFocus = (f: string) => {
        setFocus(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
    };

    const handleGenerate = async () => {
        if (!profile) return;
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/scheduler", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profile,
                    tasks,
                    userEmail: auth.currentUser?.email
                })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.details || "Failed to generate schedule.");
            }

            setScheduleData(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isClient) return null; // Avoid hydration mismatch

    return (
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl flex items-center justify-center gap-4">
                    <CalendarClock className="h-10 w-10 text-accent" />
                    Smart <span className="text-accent">Scheduler</span>
                </h1>
                <p className="mt-4 text-lg text-foreground/70">
                    AI-powered time management built to organize the chaos of your CS degree.
                </p>
            </div>

            {!profile ? (
                /* Step 1: Onboarding */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto glass p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Set up your study profile</h2>

                    <div className="space-y-8">
                        {/* Year */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground/80">Current Year</label>
                            <div className="flex flex-wrap gap-2">
                                {YEARS.map(y => (
                                    <button
                                        key={y} onClick={() => setYear(y)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${year === y ? 'bg-accent text-background scale-105' : 'bg-white/5 border border-white/10 hover:bg-white/10'} `}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hours */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground/80">
                                How many hours per day can you consistently study? <span className="text-accent ml-2">{hours} hrs</span>
                            </label>
                            <input
                                type="range" min="1" max="10" step="1"
                                value={hours} onChange={(e) => setHours(Number(e.target.value))}
                                className="w-full accent-accent h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-foreground/40 mt-1 px-1">
                                <span>1 hr</span><span>10 hrs</span>
                            </div>
                        </div>

                        {/* Days */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground/80">Which days are you most free?</label>
                            <div className="flex flex-wrap gap-2">
                                {DAYS.map(d => (
                                    <button
                                        key={d} onClick={() => toggleDay(d)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${freeDays.includes(d) ? 'bg-accent/20 border-accent/50 text-accent scale-105' : 'bg-white/5 border border-white/10 hover:bg-white/10'} border`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Focus Areas */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground/80">Current Focus Areas (Multi-select)</label>
                            <div className="flex flex-wrap gap-2">
                                {FOCUS_AREAS.map(f => (
                                    <button
                                        key={f} onClick={() => toggleFocus(f)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${focus.includes(f) ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 scale-105' : 'bg-white/5 border border-white/10 hover:bg-white/10'} border`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Specific Goals */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground/80">Preparing for anything specific? (Optional)</label>
                            <textarea
                                value={goals} onChange={(e) => setGoals(e.target.value)}
                                placeholder="e.g. Google interview in 3 months, Semester finals in 6 weeks, Hackathon next weekend..."
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent min-h-[100px] resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={handleSaveProfile}
                                className="flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform"
                            >
                                Continue to Dashboard <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Step 2: Main Dashboard (Kanban + Generator) */
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">Your Tasks & Schedule</h2>
                            <p className="text-foreground/60 text-sm mt-1">
                                {profile.year} • Focusing on {profile.focusAreas.length} areas • {profile.hoursPerDay} hrs/day
                            </p>
                        </div>
                        <button
                            onClick={() => setProfile(null)}
                            className="text-xs text-foreground/40 hover:text-foreground transition-colors underline"
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="mt-8">
                        <KanbanBoard onTasksChange={setTasks} />
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center border-t border-white/10 pt-8">
                        {error && <p className="text-red-400 mb-4">{error}</p>}

                        <button
                            onClick={handleGenerate}
                            disabled={tasks.length === 0 || isLoading}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${tasks.length === 0 || isLoading ? 'bg-white/5 text-foreground/30 cursor-not-allowed' : 'bg-accent/20 border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-[0_0_20px_rgba(196,154,108,0.3)] hover:scale-105'}`}
                        >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Sparkles className="h-6 w-6" />}
                            {isLoading ? "Analyzing Constraints..." : "Generate Smart Schedule"}
                        </button>
                    </div>

                    {scheduleData && (
                        <div className="mt-16 border-t border-white/10 pt-16">
                            <ScheduleView data={scheduleData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Trophy, CheckCircle2, Circle } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";

export interface RoadmapPhase {
    name: string;
    completed: boolean;
    completedAt: string | null;
}

export interface DashboardRoadmap {
    id: string;
    domain: string;
    year: string;
    phases: RoadmapPhase[];
    startedAt: string;
    finishedAt: string | null;
    status: "active" | "completed";
}

interface Props {
    onPhaseComplete: (roadmapId: string, domain: string, phaseName: string, date: string, progress: number) => void;
}

export default function RoadmapSection({ onPhaseComplete }: Props) {
    const [roadmaps, setRoadmaps] = useState<DashboardRoadmap[]>([]);
    const [confettiId, setConfettiId] = useState<string | null>(null);
    const isGuest = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true" && !auth.currentUser;

    useEffect(() => {
        loadRoadmaps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadRoadmaps = async () => {
        if (isGuest) {
            const cached = localStorage.getItem("guestRoadmaps");
            if (cached) setRoadmaps(JSON.parse(cached));
            return;
        }
        const user = auth.currentUser;
        if (!user) return;
        try {
            const snap = await getDocs(collection(db, "users", user.uid, "roadmaps"));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as DashboardRoadmap));
            setRoadmaps(data);
        } catch { }
    };

    const saveRoadmaps = async (updated: DashboardRoadmap[]) => {
        setRoadmaps(updated);
        if (isGuest) {
            localStorage.setItem("guestRoadmaps", JSON.stringify(updated));
            return;
        }
    };

    const handlePhaseCheck = async (roadmapId: string, phaseIndex: number) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
        const isoDate = now.toISOString();

        const updated = roadmaps.map(rm => {
            if (rm.id !== roadmapId) return rm;
            const newPhases = [...rm.phases];
            newPhases[phaseIndex] = { ...newPhases[phaseIndex], completed: true, completedAt: dateStr };

            const allDone = newPhases.every(p => p.completed);
            const completedCount = newPhases.filter(p => p.completed).length;
            const progress = Math.round((completedCount / newPhases.length) * 100);

            onPhaseComplete(rm.id, rm.domain, newPhases[phaseIndex].name, isoDate, progress);

            if (allDone) {
                setConfettiId(roadmapId);
                setTimeout(() => setConfettiId(null), 3000);
            }

            return {
                ...rm,
                phases: newPhases,
                status: allDone ? "completed" as const : "active" as const,
                finishedAt: allDone ? dateStr : null,
            };
        });

        await saveRoadmaps(updated);

        if (!isGuest) {
            const user = auth.currentUser;
            if (!user) return;
            const rm = updated.find(r => r.id === roadmapId);
            if (rm) {
                await updateDoc(doc(db, "users", user.uid, "roadmaps", roadmapId), {
                    phases: rm.phases,
                    status: rm.status,
                    finishedAt: rm.finishedAt,
                }).catch(() => { });
            }
        }
    };

    const active = roadmaps.filter(r => r.status === "active");
    const completed = roadmaps.filter(r => r.status === "completed");

    return (
        <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                🗺️ My Roadmaps
            </h2>

            {isGuest && (
                <div className="mb-4 px-4 py-2.5 rounded-xl bg-accent/8 border border-accent/20 text-xs text-accent/80">
                    Sign in to save your progress permanently.
                </div>
            )}

            {roadmaps.length === 0 && (
                <p className="text-foreground/30 text-sm">
                    No roadmaps added yet. Go to the <a href="/roadmaps" className="text-accent underline">Roadmaps</a> page and click &quot;Add to Dashboard&quot; to start tracking.
                </p>
            )}

            {/* Current Roadmaps */}
            {active.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">Current Roadmaps</h3>
                    <div className="space-y-6">
                        {active.map(rm => {
                            const completedCount = rm.phases.filter(p => p.completed).length;
                            const progress = Math.round((completedCount / rm.phases.length) * 100);

                            return (
                                <div key={rm.id} className="bg-white/3 border border-white/8 rounded-2xl p-5 relative overflow-hidden">
                                    {confettiId === rm.id && (
                                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                            <div className="text-6xl animate-bounce">🎉</div>
                                        </div>
                                    )}
                                    <h4 className="font-bold text-sm mb-1">📌 {rm.domain} ({rm.year})</h4>

                                    <div className="space-y-2 mt-3">
                                        {rm.phases.map((phase, i) => (
                                            <div key={i} className="flex items-start gap-3 group">
                                                <button
                                                    disabled={phase.completed}
                                                    onClick={() => handlePhaseCheck(rm.id, i)}
                                                    className={`mt-0.5 shrink-0 transition-all duration-200 ${phase.completed
                                                            ? "text-green-400 cursor-default"
                                                            : "text-foreground/20 hover:text-accent cursor-pointer"
                                                        }`}
                                                    style={phase.completed ? { pointerEvents: "none" } : {}}
                                                >
                                                    {phase.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                                                </button>
                                                <div className="flex-1">
                                                    <span className={`text-sm ${phase.completed ? "text-foreground/50 line-through" : ""}`}>
                                                        {phase.name}
                                                    </span>
                                                    {phase.completedAt && (
                                                        <p className="text-xs text-accent/60 mt-0.5">Completed: {phase.completedAt}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-xs text-foreground/50 mb-1.5">
                                            <span>Progress</span>
                                            <span className="font-semibold text-accent">{progress}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full transition-all duration-700 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Completed Roadmaps */}
            {completed.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">Completed Roadmaps ✅</h3>
                    <div className="space-y-3">
                        {completed.map(rm => (
                            <div key={rm.id} className="bg-green-500/5 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3">
                                <Trophy className="h-5 w-5 text-yellow-500 shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{rm.domain}</p>
                                    <p className="text-xs text-foreground/40">Finished: {rm.finishedAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

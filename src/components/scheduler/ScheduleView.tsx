"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Calendar, Lightbulb, Clock, Play, Pause, X } from "lucide-react";

export type ScheduleSlot = {
    time: string;
    task: string;
    category: string;
    priority: string;
    tip: string;
}

export type ScheduleDay = {
    day: string;
    date: string;
    total_study_hours: number;
    slots: ScheduleSlot[];
    rest_periods: string[];
    daily_quote: string;
}

export type ScheduleData = {
    schedule: ScheduleDay[];
    weekly_summary: string;
    burnout_warning: string | null;
}

function getCategoryColor(cat: string) {
    if (cat.includes("DSA") || cat.includes("Competitive")) return "bg-violet-500/10 border-violet-500/30 text-violet-300";
    if (cat.includes("Roadmap")) return "bg-blue-500/10 border-blue-500/30 text-blue-300";
    if (cat.includes("Assignment") || cat.includes("Exam")) return "bg-amber-500/10 border-amber-500/30 text-amber-300";
    if (cat.includes("Project")) return "bg-green-500/10 border-green-500/30 text-green-300";
    if (cat.includes("Deadline") || cat.includes("Urgent")) return "bg-red-500/10 border-red-500/30 text-red-300";
    return "bg-white/5 border-white/10 text-white/80"; // Default
}

// Stub for the Focus Timer Modal
// We'll implement Focus Mode logic simply here
function FocusTimerModal({ slot, onClose }: { slot: ScheduleSlot, onClose: () => void }) {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
    const [isRunning, setIsRunning] = useState(false);

    // Basic timer effect
    // (In a real app, this would use setInterval carefully)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#1C1C1E] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center space-y-6 animate-in zoom-in duration-300">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold">{slot.task}</h3>
                    <p className="text-sm text-foreground/50">{slot.category} • Focus Session</p>
                </div>

                <div className="text-7xl font-mono font-bold text-accent tracking-tighter shadow-xl">
                    {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>

                <div className="p-4 bg-white/5 rounded-xl text-left border border-white/10">
                    <p className="text-xs font-bold text-accent mb-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> AI Tip</p>
                    <p className="text-sm text-foreground/80">{slot.tip}</p>
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                        Cancel
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-xl bg-accent text-background font-bold hover:scale-105 transition-transform text-sm">
                        Start 25m Timer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function ScheduleView({ data }: { data: ScheduleData | null }) {
    const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);

    if (!data) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Burnout Warning */}
            {data.burnout_warning && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-4 text-red-300">
                    <AlertTriangle className="h-6 w-6 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-red-400">Burnout Warning</h4>
                        <p className="text-sm mt-1">{data.burnout_warning}</p>
                    </div>
                </div>
            )}

            {/* Weekly Summary */}
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" /> Weekly AI Summary
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                    {data.weekly_summary}
                </p>
            </div>

            {/* Horizontal Calendar */}
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x border-t border-white/10 pt-8 mt-8 custom-scrollbar">
                {data.schedule.map((day, i) => (
                    <div key={i} className="shrink-0 w-80 snap-start space-y-4">
                        {/* Day Header */}
                        <div className="glass p-4 rounded-2xl border-t-4 border-t-accent sticky top-0">
                            <h4 className="text-xl font-bold">{day.day}</h4>
                            <div className="flex justify-between items-center mt-1 text-xs text-foreground/50">
                                <span>{day.date}</span>
                                <span>{day.total_study_hours} hrs total</span>
                            </div>
                            <p className="text-xs italic text-accent mt-3 opacity-80 decoration-accent max-w-[250px] truncate" title={day.daily_quote}>
                                "{day.daily_quote}"
                            </p>
                        </div>

                        {/* Slots */}
                        <div className="space-y-3">
                            {day.slots.map((slot, j) => (
                                <div
                                    key={j}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-all group ${getCategoryColor(slot.category)}`}
                                >
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h5 className="font-bold text-sm leading-tight group-hover:underline decoration-white/30 underline-offset-4">{slot.task}</h5>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 border border-current px-1.5 py-0.5 rounded">
                                            {slot.priority}
                                        </span>
                                        <span className="text-[10px] opacity-70 truncate max-w-[120px]">
                                            {slot.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs opacity-80 mt-3 pt-2 border-t border-current/20">
                                        <Clock className="w-3 h-3" /> {slot.time}
                                    </div>
                                </div>
                            ))}

                            {/* Rest Periods */}
                            {day.rest_periods.map((rest, k) => (
                                <div key={`rest-${k}`} className="p-2 rounded-lg bg-black/20 border border-white/5 text-center text-xs text-foreground/40 italic flex items-center justify-center gap-2">
                                    ☕ {rest} Break
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedSlot && <FocusTimerModal slot={selectedSlot} onClose={() => setSelectedSlot(null)} />}

            {/* Custom scrollbar styling block inline */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(196,154,108,0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(196,154,108,0.6);
                }
            `}</style>
        </div>
    )
}

"use client";

import { useState, useEffect, useRef } from "react";
import { X, Target, AlertCircle, ChevronDown } from "lucide-react";
import { CalendarEvent, EventPriority, EventType } from "@/lib/calendar";

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Partial<CalendarEvent>) => void;
    initialDate?: Date;
    existingEvent?: CalendarEvent;
}

const EVENT_TYPES: { value: EventType; label: string }[] = [
    { value: "exam", label: "Exam" },
    { value: "assignment", label: "Assignment" },
    { value: "project", label: "Project Deadline" },
    { value: "scholarship", label: "Scholarship" },
    { value: "goal", label: "Personal Goal" },
    { value: "event", label: "General Event" },
];

export default function EventModal({ isOpen, onClose, onSave, initialDate, existingEvent }: EventModalProps) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState<EventType>("exam");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState<EventPriority>("medium");
    const [subject, setSubject] = useState("");
    const [syllabusPct, setSyllabusPct] = useState(0);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const categoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setCategoryOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    useEffect(() => {
        if (existingEvent) {
            setTitle(existingEvent.title);
            setType(existingEvent.type);
            setDate(existingEvent.date.toISOString().slice(0, 10));
            setPriority(existingEvent.priority);
            setSubject(existingEvent.metadata?.subject || "");
            setSyllabusPct(existingEvent.metadata?.syllabusCoverage || 0);
        } else if (initialDate) {
            // Local date offset to string
            const offset = initialDate.getTimezoneOffset();
            const adjustedDate = new Date(initialDate.getTime() - (offset * 60 * 1000));
            setDate(adjustedDate.toISOString().slice(0, 10));
            setTitle("");
            setType("exam");
            setPriority("medium");
            setSubject("");
            setSyllabusPct(0);
        }
    }, [existingEvent, initialDate, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert YYYY-MM-DD back to a local date at noon to avoid timezone shift dropping it to previous day
        const [y, m, d] = date.split('-').map(Number);
        const targetDate = new Date(y, m - 1, d, 12, 0, 0);

        const metadata: Record<string, any> = {};
        if (type === "exam" || type === "assignment") {
            if (subject) metadata.subject = subject;
            if (type === "exam") metadata.syllabusCoverage = syllabusPct;
        }

        onSave({
            title,
            type,
            date: targetDate,
            priority,
            metadata,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in transition-all">
            <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold">{existingEvent ? "Edit Event" : "Create Event"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-foreground/50 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto thin-scrollbar flex-1 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="text-sm text-foreground/70 mb-2 block">Event Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Data Structures Final"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Type — custom dropdown so options stay dark and readable */}
                        <div ref={categoryRef} className="relative">
                            <label className="text-sm text-foreground/70 mb-2 block">Category</label>
                            <button
                                type="button"
                                title="Event Category"
                                onClick={() => setCategoryOpen((o) => !o)}
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-left flex items-center justify-between focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all hover:bg-[#222] text-white"
                            >
                                <span>{EVENT_TYPES.find(t => t.value === type)?.label ?? type}</span>
                                <ChevronDown className={`h-4 w-4 text-foreground/50 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
                            </button>
                            {categoryOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 z-10 rounded-xl border border-white/10 bg-[#1a1a1a] shadow-xl overflow-hidden">
                                    {EVENT_TYPES.map((t) => (
                                        <button
                                            key={t.value}
                                            type="button"
                                            onClick={() => { setType(t.value); setCategoryOpen(false); }}
                                            className={`w-full px-4 py-3 text-left text-sm transition-colors text-white ${type === t.value
                                                ? "bg-[#262626] font-medium"
                                                : "bg-[#1a1a1a] hover:bg-[#222]"
                                                }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div>
                            <label className="text-sm text-foreground/70 mb-2 block">Date</label>
                            <input
                                title="Event Date"
                                type="date"
                                required
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all [&::-webkit-calendar-picker-indicator]:invert"
                            />
                        </div>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="text-sm text-foreground/70 mb-2 block">Priority (Impacts reminders)</label>
                        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                            {(["low", "medium", "high", "critical"] as EventPriority[]).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${priority === p
                                        ? p === "critical" ? "bg-red-500 text-white" : p === "high" ? "bg-orange-500 text-white" : p === "medium" ? "bg-black text-white border border-white/20" : "bg-blue-500 text-white"
                                        : "hover:bg-white/10 text-foreground/60 hover:text-white"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Metadata fields specifically for Exams/Assignments */}
                    {(type === "exam" || type === "assignment") && (
                        <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl space-y-4">
                            <h4 className="text-sm font-semibold flex items-center gap-2 text-blue-400">
                                <Target className="w-4 h-4" /> Academic Details
                            </h4>
                            <div>
                                <label className="text-xs text-foreground/70 mb-1 block">Subject Code / Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. CS101"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 transition-all"
                                />
                            </div>

                            {type === "exam" && (
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-foreground/70">Syllabus Coverage</span>
                                        <span className="text-blue-400 font-bold">{syllabusPct}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="100" step="10"
                                        title="Syllabus Coverage"
                                        value={syllabusPct}
                                        onChange={e => setSyllabusPct(Number(e.target.value))}
                                        className="w-full accent-blue-500"
                                    />
                                    <p className="text-[10px] text-foreground/40 mt-1">Our AI will use this to suggest revision strategies.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Info bar */}
                    <div className="bg-white/5 rounded-xl p-3 flex items-start gap-3 mt-4">
                        <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground/60 leading-relaxed">
                            Based on your date and priority, the Engine will automatically schedule and send email reminders 1-week, 3-days, and 1-day before.
                        </p>
                    </div>

                </form>

                <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-black/20">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium text-foreground/70 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button type="button" onClick={handleSubmit} className="btn-primary px-6 py-2.5 font-bold">
                        {existingEvent ? "Save Changes" : "Create Event"}
                    </button>
                </div>
            </div>
        </div>
    );
}

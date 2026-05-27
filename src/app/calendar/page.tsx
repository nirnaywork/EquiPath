"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getCalendarEvents, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent, CalendarEvent, getTodayIST, getDateInIST } from "@/lib/calendar";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2, CalendarPlus, BellRing, BrainCircuit, Trash2, Edit3, AlertTriangle } from "lucide-react";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import EventModal from "@/components/calendar/EventModal";

const PRIORITIES = {
    low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    medium: "text-white bg-black/40 border-white/20",
    high: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    critical: "text-red-500 bg-red-500/10 border-red-500/20",
};

export default function CalendarPage() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [authChecked, setAuthChecked] = useState(false);

    // Modal Stat
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined);

    // AI Suggestions (loaded after calendar is visible)
    const [suggestions, setSuggestions] = useState<{ title: string, description: string, priority: string }[]>([]);
    const [loadingAI, setLoadingAI] = useState(false);
    const [suggestionQuotaExceeded, setSuggestionQuotaExceeded] = useState(false);
    const [suggestionError, setSuggestionError] = useState<string | null>(null); // Fixed: show user-friendly AI errors in UI

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
            setAuthChecked(true);
            fetchEvents(user.uid);
        }
        const unsub = onAuthStateChanged(auth, (u) => {
            setAuthChecked(true);
            if (u) {
                setUserId(u.uid);
                fetchEvents(u.uid);
            } else {
                router.push("/");
            }
        });
        return () => unsub();
    }, [router]);

    const fetchEvents = async (uid: string, bypassCache = false) => {
        setLoading(true);
        try {
            const data = await getCalendarEvents(uid, bypassCache ? { bypassCache: true } : undefined);
            setEvents(data);
            // Defer AI insights so calendar paints first
            if (data.length > 0) {
                const runInsights = () => generateInsights(data);
                if (typeof requestIdleCallback !== "undefined") {
                    requestIdleCallback(runInsights, { timeout: 800 });
                } else {
                    setTimeout(runInsights, 400);
                }
            }
        } catch (e) {
            console.error("Failed to fetch events", e);
        } finally {
            setLoading(false);
        }
    };

    const generateInsights = async (currentEvents: CalendarEvent[]) => {
        if (currentEvents.length === 0) return;
        setLoadingAI(true);
        setSuggestionQuotaExceeded(false);
        setSuggestionError(null);
        try {
            const upcoming = currentEvents.filter(e => e.date >= new Date());
            const payload = upcoming.map(e => ({
                title: e.title,
                type: e.type,
                date: e.date,
                priority: e.priority,
                metadata: e.metadata
            }));

            const res = await fetch("/api/calendar/suggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ events: payload, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
            });

            if (res.ok) {
                const data = await res.json();
                setSuggestions(data.suggestions || []);
            } else {
                // Fixed: Groq failures must show a clear message on screen
                const data = await res.json().catch(() => ({}));
                const msg = typeof (data as any)?.error === "string"
                    ? (data as any).error
                    : "Our AI is experiencing high demand at the moment — please check back in a few hours.";
                setSuggestionError(msg);
            }
        } catch (e) {
            console.error("AI Insight Error:", e);
            setSuggestionError("Our AI is experiencing high demand at the moment — please check back in a few hours.");
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSaveEvent = async (eventData: Partial<CalendarEvent>) => {
        if (!userId) return;
        try {
            if (editingEvent?.id) {
                await updateCalendarEvent(userId, editingEvent.id, eventData);
            } else {
                await addCalendarEvent(userId, eventData as any);
            }
            await fetchEvents(userId, true); // Bypass cache so new/updated event shows in Upcoming
        } catch (e) {
            console.error("Error saving event", e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!userId || !confirm("Delete this event?")) return;
        try {
            await deleteCalendarEvent(userId, id);
            await fetchEvents(userId, true);
        } catch (e) {
            console.error("Failed to delete", e);
        }
    };

    const openNewEvent = (date?: Date) => {
        setEditingEvent(undefined);
        setSelectedDate(date);
        setModalOpen(true);
    };

    const openEditEvent = (evt: CalendarEvent) => {
        setEditingEvent(evt);
        setSelectedDate(undefined);
        setModalOpen(true);
    };

    // Redirect only after we know auth state; never block the whole page
    if (authChecked && !userId) {
        return null;
    }

    const todayIST = getTodayIST();

    const toDate = (d: Date | { toDate?: () => Date } | string): Date =>
        d instanceof Date ? d : typeof (d as any)?.toDate === "function" ? (d as any).toDate() : new Date(d as string);

    const upcomingEvents = events
        .filter((e) => getDateInIST(toDate(e.date)) >= todayIST)
        .sort((a, b) => toDate(a.date).getTime() - toDate(b.date).getTime())
        .slice(0, 5);

    const overdueEvents = events
        .filter((e) => getDateInIST(toDate(e.date)) < todayIST && e.type !== "goal")
        .sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime())
        .slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">Smart <span className="text-blue-500">Calendar</span></h1>
                    <p className="text-foreground/60 text-lg">AI-powered tracking to ensure you never miss a deadline again.</p>
                </div>
                <button onClick={() => openNewEvent()} className="btn-primary flex items-center gap-2 px-6 py-3 font-semibold group shrink-0 w-full sm:w-auto justify-center">
                    <CalendarPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Add Event
                </button>
            </div>

            {/* AI Insights Banner */}
            {suggestionError && !loadingAI && (
                <div className="mb-8 glass border border-red-500/20 bg-red-500/5 rounded-3xl p-6 sm:p-8">
                    <p className="text-red-200/90 text-sm">
                        <strong>Engine Insights</strong> — {suggestionError}
                    </p>
                </div>
            )}
            {suggestions.length > 0 && (
                <div className="mb-8 glass bg-gradient-to-r from-blue-500/10 to-violet-500/5 border border-blue-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <BrainCircuit className="w-48 h-48" />
                    </div>

                    <div className="flex items-center gap-3 mb-4 text-blue-400 font-bold">
                        <BrainCircuit className="w-5 h-5" />
                        <h3>Engine Insights</h3>
                        {loadingAI && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                        {suggestions.map((s, i) => (
                            <div key={i} className="bg-[#0A0A0A]/50 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                                <h4 className={`text-sm font-bold mb-1 ${s.priority === 'critical' ? 'text-red-400' : s.priority === 'high' ? 'text-orange-400' : 'text-white'}`}>
                                    {s.title}
                                </h4>
                                <p className="text-xs text-foreground/60 leading-relaxed">{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Main Calendar Area */}
                <div className="lg:col-span-2">
                    <CalendarGrid
                        currentDate={currentDate}
                        onMonthChange={setCurrentDate}
                        events={events}
                        onDayClick={openNewEvent}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Overdue Events */}
                    {overdueEvents.length > 0 && (
                        <div className="glass rounded-3xl p-6 border-red-500/20 bg-red-500/5">
                            <h3 className="text-red-400 font-bold flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-4 h-4" /> Overdue
                            </h3>
                            <div className="space-y-3">
                                {overdueEvents.map(ev => (
                                    <div key={ev.id} className="bg-black/40 border border-red-500/20 rounded-xl p-3 flex justify-between items-center group">
                                        <div>
                                            <p className="font-semibold text-sm line-through text-red-200/50">{ev.title}</p>
                                            <p className="text-xs text-red-400/60">{ev.date.toLocaleDateString()}</p>
                                        </div>
                                        <button onClick={() => handleDelete(ev.id!)} className="text-foreground/30 hover:text-red-400 transition-colors p-2">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upcoming Events */}
                    <div className="glass rounded-3xl p-6">
                        <h3 className="font-bold flex items-center gap-2 mb-6">
                            <BellRing className="w-4 h-4 text-accent" /> Upcoming Deadlines
                            {loading && <Loader2 className="w-4 h-4 text-accent animate-spin ml-1" />}
                        </h3>

                        {loading && events.length === 0 ? (
                            <p className="text-sm text-foreground/50 text-center py-8 flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                            </p>
                        ) : upcomingEvents.length === 0 ? (
                            <p className="text-sm text-foreground/50 text-center py-8">No upcoming events. You're all clear!</p>
                        ) : (
                            <div className="space-y-3">
                                {upcomingEvents.map(ev => {
                                    const evIST = getDateInIST(toDate(ev.date));
                                    const diffDays = Math.round((parseInt(evIST.replace(/-/g, ""), 10) - parseInt(todayIST.replace(/-/g, ""), 10)));

                                    return (
                                        <div key={ev.id} className="bg-black/20 border border-white/5 hover:bg-white/5 transition-colors rounded-xl p-4 group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${PRIORITIES[ev.priority]}`}>
                                                        {ev.type}
                                                    </span>
                                                    <span className="text-xs text-foreground/50">
                                                        {diffDays === 0 ? 'Today' : diffDays === 1 ? 'Tomorrow' : `In ${diffDays} days`}
                                                    </span>
                                                </div>
                                                <div className="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => openEditEvent(ev)} className="p-1.5 hover:bg-white/10 rounded-md text-foreground/50 hover:text-white">
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button onClick={() => handleDelete(ev.id!)} className="p-1.5 hover:bg-red-500/20 rounded-md text-foreground/50 hover:text-red-400">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <h4 className="font-semibold text-sm mb-1">{ev.title}</h4>

                                            {ev.type === "exam" && (
                                                <div className="mt-3">
                                                    <div className="flex justify-between text-[10px] text-foreground/50 mb-1">
                                                        <span>Syllabus Covered</span>
                                                        <span>{ev.metadata?.syllabusCoverage || 0}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                            style={{ width: `${ev.metadata?.syllabusCoverage || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <EventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveEvent}
                initialDate={selectedDate}
                existingEvent={editingEvent}
            />
        </div>
    );
}

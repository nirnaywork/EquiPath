"use client";

import { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import { X, Trash2, Plus } from "lucide-react";
import { 
    UnifiedCalendarEvent, 
    getUnifiedCalendarEvents, 
    onCalendarUpdate, 
    deleteUnifiedCalendarEvent,
    addUnifiedCalendarEvent,
    COLORS 
} from "@/lib/calendarUnified";

interface Props {
    initialEvents?: UnifiedCalendarEvent[];
}

export type { UnifiedCalendarEvent };

export default function CalendarSection({ initialEvents }: Props) {
    const [events, setEvents] = useState<UnifiedCalendarEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [popoverEvents, setPopoverEvents] = useState<UnifiedCalendarEvent[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newReminderTitle, setNewReminderTitle] = useState("");
    const [newReminderNotes, setNewReminderNotes] = useState("");

    // Load events on mount and listen for updates
    useEffect(() => {
        // Load initial events
        if (initialEvents && initialEvents.length > 0) {
            setEvents(initialEvents);
        } else {
            setEvents(getUnifiedCalendarEvents());
        }

        // Listen for calendar updates from other components
        const unsubscribe = onCalendarUpdate(() => {
            setEvents(getUnifiedCalendarEvents());
        });

        return () => unsubscribe();
    }, [initialEvents]);

    const eventsByDate = useMemo(() => {
        const map = new Map<string, UnifiedCalendarEvent[]>();
        events.forEach(ev => {
            const key = new Date(ev.date).toDateString();
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(ev);
        });
        return map;
    }, [events]);

    const handleDateClick = (date: Date) => {
        const key = date.toDateString();
        const dayEvents = eventsByDate.get(key) || [];
        if (dayEvents.length > 0) {
            setSelectedDate(date);
            setPopoverEvents(dayEvents);
        } else {
            setSelectedDate(null);
            setPopoverEvents([]);
        }
    };

    const handleDeleteEvent = (eventId: string) => {
        deleteUnifiedCalendarEvent(eventId);
        // Update local state
        const updated = events.filter(e => e.id !== eventId);
        setEvents(updated);
        
        // Update popover if needed
        if (selectedDate) {
            const key = selectedDate.toDateString();
            const remaining = eventsByDate.get(key)?.filter(e => e.id !== eventId) || [];
            if (remaining.length === 0) {
                setSelectedDate(null);
                setPopoverEvents([]);
            } else {
                setPopoverEvents(remaining);
            }
        }
    };

    const tileContent = ({ date }: { date: Date }) => {
        const key = date.toDateString();
        const dayEvents = eventsByDate.get(key);
        if (!dayEvents || dayEvents.length === 0) return null;

        const hasRoadmap = dayEvents.some(e => e.type === "roadmap");
        const hasReminder = dayEvents.some(e => e.type === "reminder");

        return (
            <div className="flex justify-center gap-0.5 mt-0.5">
                {hasRoadmap && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.roadmap }} />}
                {hasReminder && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.reminder }} />}
            </div>
        );
    };

    // Get upcoming events for the strip below calendar
    const upcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const sorted = [...events].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        return {
            past: sorted.filter(e => new Date(e.date) < today).slice(-3),
            upcoming: sorted.filter(e => new Date(e.date) >= today).slice(0, 5)
        };
    }, [events]);

    return (
        <div className="glass rounded-3xl p-6 sm:p-8 relative">
            <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                📅 My Learning Calendar
            </h2>

            <div className="flex items-center gap-4 mb-4 text-xs text-foreground/50">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.roadmap }} />
                    Roadmap completions
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.reminder }} />
                    Reminders
                </div>
            </div>

            <style>{`
                .react-calendar {
                    width: 100%;
                    background: transparent;
                    border: none;
                    font-family: inherit;
                    color: #fff;
                }
                .react-calendar__navigation {
                    display: flex;
                    margin-bottom: 0.5rem;
                }
                .react-calendar__navigation button {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    font-size: 1rem;
                    font-weight: 600;
                    padding: 0.5rem;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .react-calendar__navigation button:hover {
                    background: rgba(255,255,255,0.05);
                    color: #C49A6C;
                }
                .react-calendar__navigation button:disabled {
                    opacity: 0.3;
                }
                .react-calendar__month-view__weekdays {
                    text-align: center;
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.35);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding-bottom: 0.5rem;
                }
                .react-calendar__month-view__weekdays abbr {
                    text-decoration: none;
                }
                .react-calendar__tile {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    padding: 0.6rem 0.3rem;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.85rem;
                }
                .react-calendar__tile:hover {
                    background: rgba(255,255,255,0.05);
                }
                .react-calendar__tile--now {
                    background: rgba(196,154,108,0.15) !important;
                    color: #C49A6C;
                    font-weight: 700;
                }
                .react-calendar__tile--active {
                    background: rgba(196,154,108,0.25) !important;
                    color: #C49A6C;
                }
                .react-calendar__tile--neighboringMonth {
                    color: rgba(255,255,255,0.15);
                }
            `}</style>

            <Calendar
                onClickDay={handleDateClick}
                tileContent={tileContent}
                locale="en-US"
            />

            {/* Event Popover */}
            {selectedDate && popoverEvents.length > 0 && (
                <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-accent">
                            {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </h4>
                        <button onClick={() => { setSelectedDate(null); setPopoverEvents([]); }}
                            className="text-foreground/30 hover:text-foreground/60 transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {popoverEvents.map((ev) => (
                            <div key={ev.id} className="flex items-center justify-between gap-2 text-xs text-foreground/70">
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="w-2 h-2 rounded-full shrink-0" 
                                        style={{ backgroundColor: ev.type === "roadmap" ? COLORS.roadmap : COLORS.reminder }} 
                                    />
                                    <span>{ev.title}</span>
                                </div>
                                <button 
                                    onClick={() => handleDeleteEvent(ev.id)}
                                    className="text-foreground/30 hover:text-red-400 transition-colors"
                                    title="Delete event"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upcoming Events Strip */}
            {upcomingEvents.upcoming.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3">📋 Upcoming</h3>
                    <div className="space-y-2">
                        {upcomingEvents.upcoming.map(ev => (
                            <div key={ev.id} className="flex items-center gap-2 text-xs">
                                <div 
                                    className="w-2 h-2 rounded-full shrink-0" 
                                    style={{ backgroundColor: ev.type === "roadmap" ? COLORS.roadmap : COLORS.reminder }} 
                                />
                                <span className="text-foreground/70">
                                    {new Date(ev.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </span>
                                <span className="text-foreground/50">—</span>
                                <span className="text-foreground/70 truncate">{ev.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Past Events */}
            {upcomingEvents.past.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <h3 className="text-xs font-semibold text-foreground/30 uppercase tracking-wider mb-3">✓ Past</h3>
                    <div className="space-y-2">
                        {upcomingEvents.past.map(ev => (
                            <div key={ev.id} className="flex items-center gap-2 text-xs text-foreground/30">
                                <div 
                                    className="w-2 h-2 rounded-full shrink-0 opacity-50" 
                                    style={{ backgroundColor: ev.type === "roadmap" ? COLORS.roadmap : COLORS.reminder }} 
                                />
                                <span>{new Date(ev.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                <span>—</span>
                                <span className="truncate">{ev.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

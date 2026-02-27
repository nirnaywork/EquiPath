"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarEvent, getTodayIST } from "@/lib/calendar";

interface CalendarGridProps {
    currentDate: Date;
    onMonthChange: (date: Date) => void;
    events: CalendarEvent[];
    onDayClick: (date: Date) => void;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const PRIORITIES = {
    low: "bg-blue-400/50",
    medium: "bg-black/60",
    high: "bg-orange-400/50",
    critical: "bg-red-500",
};

export default function CalendarGrid({ currentDate, onMonthChange, events, onDayClick }: CalendarGridProps) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const todayYMD = getTodayIST();

    // Build the grid
    const { days, blankDays } = useMemo(() => {
        const _daysInMonth = getDaysInMonth(year, month);
        const _firstDay = getFirstDayOfMonth(year, month);
        return {
            days: Array.from({ length: _daysInMonth }, (_, i) => i + 1),
            blankDays: Array.from({ length: _firstDay }, (_, i) => i)
        };
    }, [year, month]);

    const prevMonth = () => onMonthChange(new Date(year, month - 1, 1));
    const nextMonth = () => onMonthChange(new Date(year, month + 1, 1));

    return (
        <div className="glass rounded-3xl p-6 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-display tracking-tight">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="btn-outline px-3 py-2 border-white/10 hover:border-white/20"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={nextMonth} className="btn-outline px-3 py-2 border-white/10 hover:border-white/20"><ChevronRight className="w-5 h-5" /></button>
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-semibold text-foreground/50 uppercase tracking-widest">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2">{day}</div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {blankDays.map((_, idx) => (
                    <div key={`blank-${idx}`} className="h-16 sm:h-24 rounded-2xl bg-black/10"></div>
                ))}

                {days.map((day) => {
                    const dateObj = new Date(year, month, day);
                    const dateYMD = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isToday = todayYMD === dateYMD;

                    // Find events for this day
                    const dayEvents = events.filter(e => {
                        const ed = new Date(e.date);
                        return ed.getFullYear() === year && ed.getMonth() === month && ed.getDate() === day;
                    });

                    return (
                        <div
                            key={day}
                            onClick={() => onDayClick(dateObj)}
                            className={`h-16 sm:h-24 rounded-2xl border transition-all cursor-pointer overflow-hidden pb-1 flex flex-col ${isToday
                                    ? "border-2 border-blue-500 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.35)] ring-2 ring-blue-400/40"
                                    : "border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                }`}
                        >
                            <span className={`text-sm font-semibold p-2 pt-1 block ${isToday ? "text-blue-300 font-bold" : "text-foreground/80"}`}>
                                {day}
                            </span>
                            <div className="px-1.5 flex flex-col gap-1 flex-1 overflow-y-auto thin-scrollbar">
                                {dayEvents.slice(0, 3).map((ev, i) => (
                                    <div key={i} className={`text-[10px] leading-tight truncate px-1.5 py-0.5 rounded-full ${PRIORITIES[ev.priority]}`}>
                                        {ev.title}
                                    </div>
                                ))}
                                {dayEvents.length > 3 && (
                                    <div className="text-[10px] text-foreground/50 px-1">+ {dayEvents.length - 3} more</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Unified Calendar - Single source of truth for all calendar events
 * Used by both Dashboard Calendar and Remind Me (Calendar) page
 */

export type UnifiedEventType = "roadmap" | "reminder";

export interface UnifiedCalendarEvent {
    id: string;
    title: string;
    date: string; // ISO date string YYYY-MM-DD
    type: UnifiedEventType;
    color: string;
    roadmapId?: string;
    notes?: string;
}

const STORAGE_KEY = "equipath_calendar_events";

// Colors
export const COLORS = {
    roadmap: "#C49A6C",   // Coffee tone
    reminder: "#4A9EFF", // Blue
};

// Read events from localStorage
export function getUnifiedCalendarEvents(): UnifiedCalendarEvent[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Write events to localStorage
export function setUnifiedCalendarEvents(events: UnifiedCalendarEvent[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        // Dispatch event for real-time sync
        window.dispatchEvent(new Event("equipath_calendar_updated"));
    } catch {
        // Storage full or error
    }
}

// Add a new event
export function addUnifiedCalendarEvent(event: Omit<UnifiedCalendarEvent, "id">): UnifiedCalendarEvent[] {
    const events = getUnifiedCalendarEvents();
    const newEvent: UnifiedCalendarEvent = {
        ...event,
        id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    };
    events.push(newEvent);
    setUnifiedCalendarEvents(events);
    return events;
}

// Delete an event
export function deleteUnifiedCalendarEvent(eventId: string): UnifiedCalendarEvent[] {
    const events = getUnifiedCalendarEvents().filter(e => e.id !== eventId);
    setUnifiedCalendarEvents(events);
    return events;
}

// Get events for a specific date
export function getEventsForDate(date: Date): UnifiedCalendarEvent[] {
    const dateStr = date.toISOString().split("T")[0];
    return getUnifiedCalendarEvents().filter(e => e.date === dateStr);
}

// Subscribe to calendar updates
export function onCalendarUpdate(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    
    const handler = () => callback();
    window.addEventListener("equipath_calendar_updated", handler);
    return () => window.removeEventListener("equipath_calendar_updated", handler);
}

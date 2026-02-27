/**
 * Smart Calendar — local storage only (no database).
 * Events are stored in localStorage and not sent to Firebase.
 * All "today" and date comparisons use IST (Indian Standard Time).
 */

const IST_TZ = "Asia/Kolkata";

/** Today's date as YYYY-MM-DD in IST */
export function getTodayIST(): string {
    const s = new Date().toLocaleDateString("en-CA", { timeZone: IST_TZ });
    const [y, m, d] = s.split("-").map(Number);
    if (y && m && d) return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return s;
}

/** Given a date, return YYYY-MM-DD in IST (for comparison with getTodayIST()) */
export function getDateInIST(d: Date): string {
    const s = d.toLocaleDateString("en-CA", { timeZone: IST_TZ });
    const [y, m, d2] = s.split("-").map(Number);
    if (y && m && d2) return `${y}-${String(m).padStart(2, "0")}-${String(d2).padStart(2, "0")}`;
    return s;
}

export type EventPriority = "low" | "medium" | "high" | "critical";
export type EventType = "exam" | "scholarship" | "assignment" | "project" | "goal" | "event";

export interface CalendarEvent {
    id?: string;
    title: string;
    type: EventType;
    date: Date;
    priority: EventPriority;
    metadata?: Record<string, any>;
    remindersSent: {
        "1w": boolean;
        "3d": boolean;
        "1d": boolean;
        "0d": boolean;
    };
    createdAt?: Date;
    timezone: string;
}

const STORAGE_KEY = "equipath_calendar_events";

type StoredEvent = Omit<CalendarEvent, "date" | "createdAt"> & {
    date: string;
    createdAt?: string;
};

function readFromStorage(): StoredEvent[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as StoredEvent[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeToStorage(items: StoredEvent[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        /* ignore */
    }
}

function toStored(e: CalendarEvent): StoredEvent {
    return {
        ...e,
        date: e.date.toISOString(),
        createdAt: e.createdAt?.toISOString(),
    };
}

function fromStored(raw: StoredEvent): CalendarEvent {
    return {
        ...raw,
        date: new Date(raw.date),
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
    };
}

// GET EVENTS (userId kept for API compatibility; not used)
export const getCalendarEvents = async (userId: string, _options?: { bypassCache?: boolean }): Promise<CalendarEvent[]> => {
    if (!userId) return [];
    const stored = readFromStorage();
    return stored.map(fromStored).sort((a, b) => a.date.getTime() - b.date.getTime());
};

// ADD EVENT
export const addCalendarEvent = async (userId: string, event: Omit<CalendarEvent, "id" | "createdAt" | "remindersSent">) => {
    if (!userId) throw new Error("User ID is required");

    const stored = readFromStorage();
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `ev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const now = new Date();
    const newEvent: CalendarEvent = {
        ...event,
        id,
        remindersSent: { "1w": false, "3d": false, "1d": false, "0d": false },
        createdAt: now,
    };
    stored.push(toStored(newEvent));
    writeToStorage(stored);
    return id;
};

// UPDATE EVENT
export const updateCalendarEvent = async (userId: string, eventId: string, updates: Partial<Omit<CalendarEvent, "id" | "createdAt">>) => {
    if (!userId || !eventId) throw new Error("User ID and Event ID are required");

    const stored = readFromStorage();
    const idx = stored.findIndex((e) => e.id === eventId);
    if (idx === -1) return;

    const current = fromStored(stored[idx]);
    const updated: CalendarEvent = { ...current, ...updates };
    stored[idx] = toStored(updated);
    writeToStorage(stored);
};

// DELETE EVENT
export const deleteCalendarEvent = async (userId: string, eventId: string) => {
    if (!userId || !eventId) throw new Error("User ID and Event ID are required");

    const stored = readFromStorage().filter((e) => e.id !== eventId);
    writeToStorage(stored);
};

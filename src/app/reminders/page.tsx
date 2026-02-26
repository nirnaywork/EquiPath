"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Bell, Calendar, Plus, Trash2, Loader2, Info } from "lucide-react";
import { format, isPast } from "date-fns";
import Link from "next/link";

type Reminder = {
    id: string;
    eventName: string;
    date: string;
    notes: string;
    userId: string;
    emailSent: boolean;
};

export default function RemindersPage() {
    const [user, setUser] = useState<User | null>(null);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form State
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // ── Fast path: user already cached by Firebase SDK ──
        const cached = auth.currentUser;
        if (cached) {
            setUser(cached);
            fetchReminders(cached.uid);
        }

        // ── Slow path: hydrate session on cold start ──
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Only fetch if we didn't already do it in the fast path
                if (!auth.currentUser || !cached) {
                    fetchReminders(currentUser.uid);
                }
            } else {
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchReminders = async (userId: string) => {
        try {
            const q = query(
                collection(db, "reminders"),
                where("userId", "==", userId),
                orderBy("date", "asc")
            );
            const querySnapshot = await getDocs(q);
            const fetched: Reminder[] = [];
            querySnapshot.forEach((doc) => {
                fetched.push({ id: doc.id, ...doc.data() } as Reminder);
            });
            setReminders(fetched);
        } catch (error) {
            console.error("Error fetching reminders: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddReminder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please log in to set reminders.");
            return;
        }

        setIsSubmitting(true);
        try {
            const newReminder: Omit<Reminder, "id"> = {
                eventName,
                date,
                notes,
                userId: user.uid,
                emailSent: false, // For backend cron job tracking
            };

            const docRef = await addDoc(collection(db, "reminders"), { ...newReminder, userEmail: user.email, createdAt: new Date().toISOString() });
            setReminders([...reminders, { id: docRef.id, ...newReminder }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

            // Call backend to send immediate confirmation email
            if (user.email) {
                fetch("/api/reminders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "confirm", email: user.email, eventName, date })
                }).catch(err => console.error("Failed to send confirmation email", err));
            }

            setEventName("");
            setDate("");
            setNotes("");
        } catch (error) {
            console.error("Error adding reminder: ", error);
            alert("Failed to save reminder.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this reminder?")) return;
        try {
            await deleteDoc(doc(db, "reminders", id));
            setReminders(reminders.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting reminder: ", error);
        }
    };

    if (!user && !isLoading) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <Bell className="mx-auto h-16 w-16 text-foreground/20 mb-6" />
                <h2 className="text-3xl font-bold mb-4">Log in to use Reminders</h2>
                <p className="text-foreground/60 mb-8 max-w-md mx-auto text-balance">
                    Guest mode lets you view roadmaps and jobs, but you need a free account to save personal deadline alerts.
                </p>
                <Link href="/" className="inline-flex bg-white text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Never Miss a <span className="text-violet-400">Deadline</span>
                </h1>
                <p className="mt-4 text-lg text-foreground/70">
                    We&apos;ll email you exactly 24 hours before your big event.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form Container */}
                <div className="glass p-8 rounded-3xl lg:col-span-1 lg:sticky lg:top-24 border-t-4 border-t-violet-500">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus className="h-5 w-5 text-violet-400" /> New Reminder
                    </h2>
                    <form onSubmit={handleAddReminder} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Event Name</label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="e.g. Google SWE Application"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Deadline Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors [color-scheme:dark]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Notes (Optional)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Link to application, referral info..."
                                rows={3}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Bell className="h-5 w-5" />}
                            Set Reminder
                        </button>
                    </form>
                </div>

                {/* Dashboard List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/80">
                            You will receive an automated email at <b>{user?.email}</b> exactly one day before the dates listed below.
                        </p>
                    </div>

                    {isLoading ? (
                        /* Skeleton cards while Firestore loads */
                        <div className="grid gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass p-6 rounded-2xl animate-pulse">
                                    <div className="h-5 w-2/5 bg-white/10 rounded-lg mb-3" />
                                    <div className="h-4 w-1/4 bg-white/5 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    ) : reminders.length === 0 ? (
                        <div className="glass p-12 rounded-3xl text-center border-dashed border-2 border-white/10 flex flex-col items-center justify-center">
                            <Calendar className="h-12 w-12 text-foreground/20 mb-4" />
                            <h3 className="text-xl font-bold text-foreground/50">Your schedule is clear</h3>
                            <p className="text-sm text-foreground/40 mt-2">Add a deadline on the left to get started.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {reminders.map((reminder) => {
                                const pastDate = isPast(new Date(reminder.date)) && new Date(reminder.date).toDateString() !== new Date().toDateString();
                                return (
                                    <div key={reminder.id} className={`glass p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all ${pastDate ? 'opacity-50 grayscale' : 'hover:border-violet-500/30'}`}>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-xl font-bold group-hover:text-violet-400 transition-colors">{reminder.eventName}</h4>
                                                {pastDate && <span className="text-xs bg-white/10 px-2 py-0.5 rounded-md text-foreground/50 font-medium">Passed</span>}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {format(new Date(reminder.date), "MMMM do, yyyy")}
                                            </div>
                                            {reminder.notes && (
                                                <p className="text-sm text-foreground/50 mt-2 line-clamp-2 italic bg-black/20 p-2 rounded-lg inline-block w-full">{reminder.notes}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(reminder.id)}
                                            className="p-3 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors shrink-0 self-end sm:self-center"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Clock, CalendarDays, GripVertical } from "lucide-react";

export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Category = "DSA Practice" | "Roadmap Learning" | "Assignment" | "Exam Prep" | "Project Work" | "Internship Application" | "Personal" | "Deadline";
export type Status = "To Do" | "In Progress" | "Done";

export type Task = {
    id: string;
    name: string;
    category: Category;
    priority: Priority;
    deadline?: string;
    estimatedHours: number;
    status: Status;
};

const CATEGORIES: Category[] = ["DSA Practice", "Roadmap Learning", "Assignment", "Exam Prep", "Project Work", "Internship Application", "Personal"];
const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Urgent"];

const PRIORITY_COLORS: Record<Priority, string> = {
    Low: "bg-blue-500/20 text-blue-300 border-blue-500/50",
    Medium: "bg-green-500/20 text-green-300 border-green-500/50",
    High: "bg-orange-500/20 text-orange-300 border-orange-500/50",
    Urgent: "bg-red-500/20 text-red-300 border-red-500/50",
};

export default function KanbanBoard({ onTasksChange }: { onTasksChange?: (tasks: Task[]) => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Form State
    const [name, setName] = useState("");
    const [category, setCategory] = useState<Category>("DSA Practice");
    const [priority, setPriority] = useState<Priority>("Medium");
    const [deadline, setDeadline] = useState("");
    const [hours, setHours] = useState<number>(1);

    // Initial Load & Reminders Sync
    useEffect(() => {
        let currentTasks: Task[] = [];
        const saved = localStorage.getItem("equipath_scheduler_tasks");
        if (saved) {
            try {
                currentTasks = JSON.parse(saved);
                setTasks(currentTasks);
                if (onTasksChange) onTasksChange(currentTasks);
            } catch (e) {
                console.error(e);
            }
        }

        // Silent sync with Remind Me dashboard
        fetch("/api/reminders")
            .then(res => res.json())
            .then(data => {
                if (data.reminders && Array.isArray(data.reminders)) {
                    setTasks(prev => {
                        let updated = [...prev];
                        let changed = false;
                        for (const r of data.reminders) {
                            const syncId = `rem-${r.id}`;
                            if (!updated.find(t => t.id === syncId)) {
                                // Calculate if within 3 days for Urgent check
                                const isUrgent = new Date(r.date).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

                                updated.push({
                                    id: syncId,
                                    name: r.title,
                                    category: "Deadline",
                                    priority: isUrgent ? "Urgent" : "High",
                                    deadline: r.date,
                                    estimatedHours: 1, // Default
                                    status: "To Do"
                                });
                                changed = true;
                            }
                        }
                        if (changed) {
                            localStorage.setItem("equipath_scheduler_tasks", JSON.stringify(updated));
                            if (onTasksChange) onTasksChange(updated);
                            return updated;
                        }
                        return prev;
                    });
                }
            })
            .catch(console.error);
    }, []);

    // Save helper
    const saveTasks = (newTasks: Task[]) => {
        setTasks(newTasks);
        localStorage.setItem("equipath_scheduler_tasks", JSON.stringify(newTasks));
        if (onTasksChange) onTasksChange(newTasks);
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            name,
            category,
            priority,
            deadline,
            estimatedHours: hours,
            status: "To Do"
        };

        saveTasks([...tasks, newTask]);
        setName("");
        setHours(1);
        setDeadline("");
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("taskId", id);
    };

    const handleDrop = (e: React.DragEvent, newStatus: Status) => {
        const id = e.dataTransfer.getData("taskId");
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, status: newStatus } : t);
        saveTasks(updatedTasks);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // necessary to allow dropping
    };

    const deleteTask = (id: string) => {
        if (confirm("Delete this task?")) {
            saveTasks(tasks.filter(t => t.id !== id));
        }
    };

    const renderColumn = (status: Status) => {
        const columnTasks = tasks.filter(t => t.status === status);
        return (
            <div
                className="flex-1 bg-black/20 rounded-2xl p-4 border border-white/5 min-h-[400px]"
                onDrop={(e) => handleDrop(e, status)}
                onDragOver={handleDragOver}
            >
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <h3 className="font-bold text-lg">{status}</h3>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{columnTasks.length}</span>
                </div>

                <div className="space-y-3">
                    {columnTasks.map(t => (
                        <div
                            key={t.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, t.id)}
                            className="bg-white/5 border border-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors group relative"
                        >
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <h4 className="font-medium text-sm leading-tight flex-1" title={t.name}>{t.name}</h4>
                                <GripVertical className="h-4 w-4 text-white/20 shrink-0 group-hover:text-white/50" />
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`text-[10px] px-2 py-0.5 rounded border ${PRIORITY_COLORS[t.priority]}`}>
                                    {t.priority}
                                </span>
                                <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded border border-white/10">
                                    {t.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-foreground/50">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.estimatedHours}h</span>
                                {t.deadline && <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {new Date(t.deadline).toLocaleDateString()}</span>}
                            </div>

                            <button
                                onClick={() => deleteTask(t.id)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:bg-red-400/20 rounded transition-all"
                                title="Delete Task"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {columnTasks.length === 0 && (
                        <div className="text-center text-sm text-white/20 py-8 border-2 border-dashed border-white/5 rounded-xl">
                            Drop tasks here
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Input Panel */}
            <form onSubmit={handleAddTask} className="glass p-6 rounded-3xl border border-white/10 max-w-4xl mx-auto">
                <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Add New Task</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <input
                            type="text" required placeholder="Task Name (e.g. Complete Binary Trees)"
                            value={name} onChange={e => setName(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
                        />
                    </div>
                    <div>
                        <select
                            value={category} onChange={e => setCategory(e.target.value as Category)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none appearance-none"
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <select
                            value={priority} onChange={e => setPriority(e.target.value as Priority)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none appearance-none"
                        >
                            {PRIORITIES.map(p => <option key={p} value={p}>{p} Priority</option>)}
                        </select>
                    </div>
                    <div>
                        <input
                            type="date"
                            title="Deadline"
                            value={deadline} onChange={e => setDeadline(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none text-foreground/70"
                        />
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                type="number" min="0.5" step="0.5" required
                                value={hours} onChange={e => setHours(Number(e.target.value))}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
                                title="Estimated Hours"
                            />
                            <span className="absolute right-4 top-3 text-sm text-foreground/40 pointer-events-none">hrs</span>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-background font-bold px-4 py-3 rounded-xl transition-all h-full">
                            <PlusCircle className="h-5 w-5" /> Add Task
                        </button>
                    </div>
                </div>
            </form>

            {/* Kanban Board */}
            <div className="flex flex-col md:flex-row gap-6">
                {renderColumn("To Do")}
                {renderColumn("In Progress")}
                {renderColumn("Done")}
            </div>

            {/* Weekly Progress Tracker */}
            <div className="glass p-6 rounded-3xl border border-white/10 mt-8 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
                <div className="relative w-32 h-32 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="stroke-white/10 fill-none" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="40" className="stroke-accent fill-none transition-all duration-1000 ease-out" strokeWidth="8"
                            strokeDasharray={`${(tasks.filter(t => t.status === "Done").length / Math.max(1, tasks.length)) * 251.2} 251.2`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold font-mono text-accent">
                            {tasks.length === 0 ? 0 : Math.round((tasks.filter(t => t.status === "Done").length / tasks.length) * 100)}%
                        </span>
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">Weekly Goal Progress</h3>
                    <p className="text-foreground/70 mb-4 text-sm">
                        You have completed <strong className="text-white">{tasks.filter(t => t.status === "Done").length}</strong> out of <strong className="text-white">{tasks.length}</strong> tasks this week. Keep up the momentum!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                            <div className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === "Done").length}</div>
                            <div className="text-xs text-foreground/50 uppercase tracking-wider">Completed</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                            <div className="text-2xl font-bold text-amber-400">{tasks.filter(t => t.status !== "Done").length}</div>
                            <div className="text-xs text-foreground/50 uppercase tracking-wider">Remaining</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

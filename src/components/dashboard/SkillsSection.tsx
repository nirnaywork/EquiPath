"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, AlertCircle } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface Skill {
    id: string;
    name: string;
    createdAt: number;
}

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const [fadingOut, setFadingOut] = useState<string | null>(null);
    const isGuest = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true" && !auth.currentUser;

    useEffect(() => {
        if (isGuest) {
            const cached = localStorage.getItem("guestSkills");
            if (cached) setSkills(JSON.parse(cached));
            return;
        }
        const user = auth.currentUser;
        if (!user) return;
        getDoc(doc(db, "users", user.uid)).then(snap => {
            if (snap.exists() && snap.data().skills) setSkills(snap.data().skills);
        }).catch(() => { });
    }, [isGuest]);

    const saveSkills = async (newSkills: Skill[]) => {
        setSkills(newSkills);
        if (isGuest) {
            localStorage.setItem("guestSkills", JSON.stringify(newSkills));
            return;
        }
        const user = auth.currentUser;
        if (!user) return;
        await setDoc(doc(db, "users", user.uid), { skills: newSkills }, { merge: true }).catch(() => { });
    };

    const addSkill = () => {
        if (!input.trim()) {
            setError("Skill name cannot be empty.");
            return;
        }
        setError(null);
        const newSkill: Skill = { id: Date.now().toString(), name: input.trim(), createdAt: Date.now() };
        saveSkills([...skills, newSkill]);
        setInput("");
    };

    const deleteSkill = (id: string) => {
        setFadingOut(id);
        setTimeout(() => {
            saveSkills(skills.filter(s => s.id !== id));
            setFadingOut(null);
        }, 300);
    };

    const startEdit = (skill: Skill) => {
        setEditingId(skill.id);
        setEditValue(skill.name);
    };

    const saveEdit = (id: string) => {
        if (!editValue.trim()) return;
        saveSkills(skills.map(s => s.id === id ? { ...s, name: editValue.trim() } : s));
        setEditingId(null);
    };

    return (
        <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                🛠️ My Skills
            </h2>

            {isGuest && (
                <div className="mb-4 px-4 py-2.5 rounded-xl bg-accent/8 border border-accent/20 text-xs text-accent/80">
                    Sign in to save your skills permanently.
                </div>
            )}

            <div className="flex gap-2 mb-6">
                <input
                    value={input}
                    onChange={e => { setInput(e.target.value); setError(null); }}
                    onKeyDown={e => { if (e.key === "Enter") addSkill(); }}
                    placeholder="Type a skill..."
                    className="input-field flex-1 text-sm py-2.5"
                />
                <button onClick={addSkill} className="btn-primary text-xs px-4 py-2.5 shrink-0">
                    <Plus className="h-4 w-4" /> Add
                </button>
            </div>

            {error && (
                <div className="mb-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <div
                        key={skill.id}
                        className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/4 transition-all duration-300 ${fadingOut === skill.id ? "opacity-0 scale-90" : "opacity-100"
                            }`}
                    >
                        {editingId === skill.id ? (
                            <div className="flex items-center gap-1.5">
                                <input
                                    autoFocus
                                    value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter") saveEdit(skill.id); if (e.key === "Escape") setEditingId(null); }}
                                    onBlur={() => setEditingId(null)}
                                    className="bg-transparent outline-none text-sm w-20 border-b border-accent/50"
                                />
                                <button onMouseDown={e => { e.preventDefault(); saveEdit(skill.id); }}
                                    className="text-accent hover:text-accent/80">
                                    <Check className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="text-sm">{skill.name}</span>
                                <button onClick={() => startEdit(skill)}
                                    className="text-foreground/30 hover:text-accent transition-colors">
                                    <Pencil className="h-3 w-3" />
                                </button>
                                <button onClick={() => deleteSkill(skill.id)}
                                    className="text-foreground/30 hover:text-red-400 transition-colors">
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </>
                        )}
                    </div>
                ))}
                {skills.length === 0 && (
                    <p className="text-foreground/30 text-sm">No skills added yet. Start typing above!</p>
                )}
            </div>
        </div>
    );
}

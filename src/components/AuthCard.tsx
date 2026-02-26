"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { User, Mail } from "lucide-react";

export default function AuthCard() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                if (!username) {
                    setError("Username is required for sign up.");
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Store user details in Firestore
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    username,
                    email,
                    createdAt: new Date().toISOString()
                });
            }
            router.push("/roadmaps");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    const handleGuest = () => {
        router.push("/roadmaps");
    };

    return (
        <div className="glass w-full max-w-md rounded-3xl p-8 backdrop-blur-xl">
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Join EquiPath"}</h3>
                <p className="text-sm text-foreground/60 mt-2 text-balance">
                    {isLogin
                        ? "Log in to access your roadmaps and reminders."
                        : "Create an account to save your progress."}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {/* Email / Password Form */}
                <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                    {!isLogin && (
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent"
                            required
                        />
                    )}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent"
                        required
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                        <Mail className="h-4 w-4" />
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                <p className="mt-2 text-center text-xs text-foreground/50">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-accent hover:underline"
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </p>

                {/* Guest Button */}
                <button
                    onClick={handleGuest}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-4 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                >
                    <User className="h-5 w-5" />
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}

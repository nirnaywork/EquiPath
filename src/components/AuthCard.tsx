"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { setCachedUsername } from "@/lib/userCache";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function AuthCard() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                if (!username.trim()) { setError("Display name is required."); setIsLoading(false); return; }
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", cred.user.uid), {
                    username: username.trim(), email, createdAt: new Date().toISOString()
                });
                setCachedUsername(cred.user.uid, username.trim());
            }
            router.push("/dashboard");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)\.?/, "") : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        if (isGoogleLoading) return;
        setIsGoogleLoading(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            const cred = await signInWithPopup(auth, provider);

            let derivedName = cred.user.displayName;
            if (!derivedName && cred.user.email) {
                derivedName = cred.user.email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            }

            try {
                const snap = await getDoc(doc(db, "users", cred.user.uid));
                if (!snap.exists()) {
                    await setDoc(doc(db, "users", cred.user.uid), {
                        username: derivedName || "Google User", email: cred.user.email, createdAt: new Date().toISOString()
                    });
                }
                setCachedUsername(cred.user.uid, derivedName || "Google User");
            } catch { /* offline — skip */ }

            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                const code = (err as any).code;
                if (code === "auth/cancelled-popup-request" || code === "auth/popup-closed-by-user") return;
                setError(err.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)\.?/, ""));
            }
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleGuest = () => {
        localStorage.setItem("guestMode", "true");
        router.push("/dashboard");
    };

    return (
        <div className="w-full max-w-sm">
            {/* Card */}
            <div className="rounded-3xl border border-white/10 bg-[#111111]/80 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Tab switcher */}
                <div className="flex border-b border-white/8">
                    {["Sign In", "Sign Up"].map((label, i) => (
                        <button
                            key={label}
                            onClick={() => { setIsLogin(i === 0); setError(""); }}
                            className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 relative ${isLogin === (i === 0)
                                ? "text-foreground"
                                : "text-foreground/40 hover:text-foreground/70"
                                }`}
                        >
                            {label}
                            {isLogin === (i === 0) && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-7 space-y-5">
                    {/* Google */}
                    <button
                        onClick={handleGoogleAuth}
                        disabled={isGoogleLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 hover:border-white/20 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGoogleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/8" />
                        <span className="text-xs text-foreground/30 font-medium">or</span>
                        <div className="flex-1 h-px bg-white/8" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleEmailAuth} className="space-y-3">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Display name"
                                    className="input-field pl-11"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="input-field pl-11"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                className="input-field pl-11 pr-11"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-xs text-red-400/90 bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>

                    {/* Guest */}
                    <button
                        onClick={handleGuest}
                        className="w-full text-xs text-foreground/35 hover:text-foreground/60 transition-colors py-1"
                    >
                        Continue as guest →
                    </button>
                </div>
            </div>

            <p className="text-center text-[11px] text-foreground/20 mt-4">
                By continuing, you agree to our terms. Free forever.
            </p>
        </div>
    );
}

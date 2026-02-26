"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const icons = [
    { name: "Python", color: "#3776AB", x: "10%", y: "20%", delay: 0 },
    { name: "React", color: "#61DAFB", x: "70%", y: "15%", delay: 0.2 },
    { name: "Docker", color: "#2496ED", x: "40%", y: "50%", delay: 0.4 },
    { name: "TensorFlow", color: "#FF6F00", x: "80%", y: "60%", delay: 0.6 },
    { name: "Git", color: "#F05032", x: "20%", y: "75%", delay: 0.3 },
    { name: "Rust", color: "#000000", x: "60%", y: "85%", delay: 0.8 },
    { name: "JS", color: "#F7DF1E", x: "90%", y: "30%", delay: 0.5 },
];

export default function HeroIcons() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Glows */}
            <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-secondary-glow opacity-20 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent-glow opacity-20 blur-[100px]" />

            {icons.map((icon, index) => (
                <motion.div
                    key={icon.name}
                    className="glass absolute flex h-24 w-24 items-center justify-center rounded-2xl text-lg font-bold shadow-2xl"
                    style={{
                        left: icon.x,
                        top: icon.y,
                        // Subtle parallax based on mouse position
                        x: mousePosition.x * (index % 2 === 0 ? 1 : -1),
                        y: mousePosition.y * (index % 2 === 0 ? 1 : -1),
                        borderTop: `1px solid ${icon.color}40`,
                        borderLeft: `1px solid ${icon.color}40`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        opacity: { duration: 1, delay: icon.delay },
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: icon.delay,
                        },
                        rotate: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: icon.delay,
                        },
                    }}
                >
                    <span style={{ color: icon.color === "#000000" ? "#FFFFFF" : icon.color }}>
                        {icon.name}
                    </span>
                    {/* Subtle icon glow */}
                    <div
                        className="absolute -z-10 h-full w-full rounded-2xl opacity-30 blur-xl"
                        style={{ backgroundColor: icon.color }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

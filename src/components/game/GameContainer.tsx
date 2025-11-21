"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GameContainerProps {
    children: ReactNode;
    className?: string;
}

export function GameContainer({ children, className }: GameContainerProps) {
    return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full max-w-4xl ${className}`}
            >
                {children}
            </motion.div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { GameContainer } from "@/components/game/GameContainer";
import { useGame } from "@/lib/game-context";

export default function GamePage() {
    const { gameState, currentQuestion, answerQuestion, player } = useGame();
    const router = useRouter();
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (!player) {
            router.push("/");
        }
    }, [player, router]);

    useEffect(() => {
        if (gameState.isGameOver) {
            router.push("/leaderboard");
        }
    }, [gameState.isGameOver, router]);

    if (!player || !currentQuestion) return null;

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return; // Prevent double clicking
        setSelectedAnswer(index);
        setShowResult(true);

        setTimeout(() => {
            answerQuestion(index);
            setSelectedAnswer(null);
            setShowResult(false);
        }, 2000); // Show result for 2 seconds
    };

    return (
        <GameContainer className="max-w-2xl">
            <div className="flex justify-between items-center mb-6 text-purple-100">
                <div className="flex items-center gap-2 text-xl font-mono">
                    <Timer className="w-6 h-6 text-purple-400 animate-pulse" />
                    <span className={gameState.timeLeft < 10 ? "text-red-500" : ""}>
                        {gameState.timeLeft}s
                    </span>
                </div>
                <div className="text-xl font-bold">
                    Score: <span className="text-purple-400">{gameState.score}</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-purple-500/30 bg-black/60 backdrop-blur-xl overflow-hidden">
                        <div className="h-2 bg-slate-800 w-full">
                            <motion.div
                                className="h-full bg-purple-500"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((gameState.currentQuestionIndex) / 5) * 100}%` }} // Assuming 5 questions per difficulty for progress bar
                            />
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    QUESTION {gameState.currentQuestionIndex + 1}
                                </span>
                                {gameState.timeLeft < 10 && (
                                    <span className="flex items-center gap-1 text-xs font-bold text-red-400 animate-pulse">
                                        <AlertTriangle className="w-3 h-3" /> CRITICAL TIME
                                    </span>
                                )}
                            </div>
                            <CardTitle className="text-2xl leading-relaxed">
                                {currentQuestion.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {currentQuestion.answers.map((answer, index) => {
                                let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
                                if (selectedAnswer !== null) {
                                    if (index === currentQuestion.correctAnswer) variant = "default"; // Show correct
                                    else if (index === selectedAnswer) variant = "destructive"; // Show wrong
                                }

                                return (
                                    <Button
                                        key={index}
                                        variant={variant}
                                        className={`h-auto py-4 px-6 text-left justify-start text-lg transition-all duration-300 ${selectedAnswer === null ? "hover:border-purple-400 hover:bg-purple-950/30" : ""
                                            } ${variant === "default" ? "bg-green-600 hover:bg-green-600 border-green-500" : ""
                                            } ${variant === "destructive" ? "bg-red-600 hover:bg-red-600 border-red-500" : ""
                                            }`}
                                        onClick={() => handleAnswer(index)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        <span className="mr-4 opacity-50 font-mono">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        {answer}
                                        {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                                            <CheckCircle2 className="ml-auto w-5 h-5 text-white" />
                                        )}
                                        {selectedAnswer !== null && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                                            <XCircle className="ml-auto w-5 h-5 text-white" />
                                        )}
                                    </Button>
                                );
                            })}
                        </CardContent>
                        <AnimatePresence>
                            {showResult && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-slate-900/80 border-t border-purple-500/20"
                                >
                                    <CardFooter className="p-6">
                                        <p className="text-purple-100">
                                            <span className="font-bold text-purple-400">Intel:</span> {currentQuestion.details}
                                        </p>
                                    </CardFooter>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </GameContainer>
    );
}

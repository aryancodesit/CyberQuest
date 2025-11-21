"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { GameContainer } from "@/components/game/GameContainer";
import { useGame } from "@/lib/game-context";

export default function GamePage() {
    const { gameState, currentQuestion, answerQuestion, player } = useGame();
    const router = useRouter();
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

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

    // v2.0: Determine difficulty tier
    const questionNumber = gameState.currentQuestionIndex + 1;
    const tier = Math.floor(gameState.currentQuestionIndex / 5);
    const difficultyLabel = tier === 0 ? "Easy" : tier === 1 ? "Medium" : "Hard";
    const difficultyColor = tier === 0 ? "text-green-400 bg-green-500/20 border-green-500/30" :
        tier === 1 ? "text-yellow-400 bg-yellow-500/20 border-yellow-500/30" :
            "text-red-400 bg-red-500/20 border-red-500/30";

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        setShowExplanation(true);
    };

    const handleNext = () => {
        answerQuestion(selectedAnswer!);
        setSelectedAnswer(null);
        setShowExplanation(false);
    };

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const showTimer = tier !== 2; // Don't show timer for Hard questions

    return (
        <GameContainer className="max-w-2xl">
            <div className="flex justify-between items-center mb-6 text-purple-100">
                {showTimer && (
                    <div className="flex items-center gap-2 text-xl font-mono">
                        <Timer className="w-6 h-6 text-purple-400 animate-pulse" />
                        <span className={gameState.timeLeft < 10 ? "text-red-500 animate-pulse" : ""}>
                            {gameState.timeLeft}s
                        </span>
                    </div>
                )}
                {!showTimer && (
                    <div className="flex items-center gap-2 text-sm text-purple-300">
                        <span>⏱️ No Time Limit</span>
                    </div>
                )}
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
                        {/* Progress Bar */}
                        <div className="h-2 bg-slate-800 w-full">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(gameState.currentQuestionIndex / 15) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    QUESTION {questionNumber}/15
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-bold border ${difficultyColor}`}>
                                    {difficultyLabel.toUpperCase()}
                                </span>
                                {showTimer && gameState.timeLeft < 10 && (
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
                                    if (index === currentQuestion.correctAnswer) variant = "default";
                                    else if (index === selectedAnswer) variant = "destructive";
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

                        {/* v2.0: Explanation Section with Next Button */}
                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={`border-t ${isCorrect ? "bg-green-900/20 border-green-500/20" : "bg-red-900/20 border-red-500/20"
                                        }`}
                                >
                                    <CardFooter className="p-6 flex-col items-start gap-4">
                                        <div className="flex items-start gap-3 w-full">
                                            {isCorrect ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                            ) : (
                                                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                            )}
                                            <div className="flex-1">
                                                <p className={`font-bold mb-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                                                    {isCorrect ? "Correct! Well done!" : "Incorrect. Study this:"}
                                                </p>
                                                <p className="text-purple-100 leading-relaxed">
                                                    {currentQuestion.details}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleNext}
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
                                        >
                                            Continue <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
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

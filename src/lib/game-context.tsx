"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Question, Player, GameState } from "./types";
import { questions as allQuestions, shuffleQuestions } from "./questions";

interface GameContextType {
    gameState: GameState;
    player: Player | null;
    currentQuestion: Question | null;
    startGame: (username: string, difficulty: 1 | 2) => void;
    answerQuestion: (answerIndex: number) => void;
    resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// v2.0: Tiered timing system
const EASY_TIME = 30;    // 30 seconds for easy questions
const MEDIUM_TIME = 60;  // 60 seconds for medium questions
const HARD_TIME = 999;   // Unlimited time for hard questions
const TOTAL_QUESTIONS = 15;  // Total questions per game (5 easy + 5 medium + 5 hard)

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [gameState, setGameState] = useState<GameState>({
        currentQuestionIndex: 0,
        score: 0,
        timeLeft: EASY_TIME,
        isGameOver: false,
        isPlaying: false,
        answers: [],
    });

    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

    // v2.0: Select exactly 15 questions (5 easy, 5 medium, 5 hard)
    useEffect(() => {
        if (player) {
            const easyQuestions = shuffleQuestions(allQuestions.filter((q) => q.difficulty === 1)).slice(0, 5);
            const mediumQuestions = shuffleQuestions(allQuestions.filter((q) => q.difficulty === 1)).slice(5, 10);
            const hardQuestions = shuffleQuestions(allQuestions.filter((q) => q.difficulty === 2)).slice(0, 5);

            // Combine in order: Easy → Medium → Hard
            const tieredQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
            setFilteredQuestions(tieredQuestions);
        }
    }, [player]);

    const startGame = useCallback((username: string, difficulty: 1 | 2) => {
        setPlayer({ username, score: 0, difficulty });
        setGameState({
            currentQuestionIndex: 0,
            score: 0,
            timeLeft: EASY_TIME, // Start with easy question timer
            isGameOver: false,
            isPlaying: true,
            answers: [],
        });
    }, []);

    const endGame = useCallback(() => {
        setGameState((prev) => ({ ...prev, isPlaying: false, isGameOver: true }));
    }, []);

    const answerQuestion = useCallback(
        (answerIndex: number) => {
            if (!player || gameState.isGameOver) return;

            const currentQuestion = filteredQuestions[gameState.currentQuestionIndex];
            const isCorrect = currentQuestion.correctAnswer === answerIndex;

            setGameState((prev) => {
                // v2.0: Difficulty-based scoring (Easy: +10, Medium: +20, Hard: +30)
                const questionTier = Math.floor(prev.currentQuestionIndex / 5); // 0=Easy, 1=Medium, 2=Hard
                const pointsForCorrect = (questionTier + 1) * 10;
                const newScore = isCorrect ? prev.score + pointsForCorrect : prev.score;

                const nextIndex = prev.currentQuestionIndex + 1;
                const isFinished = nextIndex >= TOTAL_QUESTIONS;

                if (isFinished) {
                    return {
                        ...prev,
                        score: newScore,
                        answers: [...prev.answers, answerIndex],
                        isPlaying: false,
                        isGameOver: true,
                    };
                }

                // v2.0: Set new timer based on next question tier
                let newTimeLeft = EASY_TIME; // Default to easy
                const nextTier = Math.floor(nextIndex / 5);
                if (nextTier === 1) newTimeLeft = MEDIUM_TIME;
                else if (nextTier === 2) newTimeLeft = HARD_TIME;

                return {
                    ...prev,
                    score: newScore,
                    timeLeft: newTimeLeft,
                    answers: [...prev.answers, answerIndex],
                    currentQuestionIndex: nextIndex,
                };
            });
        },
        [filteredQuestions, gameState.currentQuestionIndex, gameState.isGameOver, player]
    );

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState.isPlaying && gameState.timeLeft > 0) {
            interval = setInterval(() => {
                setGameState((prev) => {
                    if (prev.timeLeft <= 1) {
                        return { ...prev, timeLeft: 0, isPlaying: false, isGameOver: true };
                    }
                    return { ...prev, timeLeft: prev.timeLeft - 1 };
                });
            }, 1000);
        } else if (gameState.timeLeft <= 0 && gameState.isPlaying) {
            endGame();
        }
        return () => clearInterval(interval);
    }, [gameState.isPlaying, gameState.timeLeft, endGame]);

    const resetGame = () => {
        setPlayer(null);
        setGameState({
            currentQuestionIndex: 0,
            score: 0,
            timeLeft: EASY_TIME,
            isGameOver: false,
            isPlaying: false,
            answers: [],
        });
    };

    const currentQuestion = filteredQuestions[gameState.currentQuestionIndex] || null;

    return (
        <GameContext.Provider
            value={{
                gameState,
                player,
                currentQuestion,
                startGame,
                answerQuestion,
                resetGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}

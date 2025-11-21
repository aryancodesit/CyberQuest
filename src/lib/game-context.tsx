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

const GAME_DURATION = 60; // 60 seconds initial time
const TIME_BONUS = 5; // 5 seconds bonus for correct answer

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [gameState, setGameState] = useState<GameState>({
        currentQuestionIndex: 0,
        score: 0,
        timeLeft: GAME_DURATION,
        isGameOver: false,
        isPlaying: false,
        answers: [],
    });

    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

    // Filter and shuffle questions based on difficulty when game starts
    useEffect(() => {
        if (player) {
            const filtered = allQuestions.filter((q) => q.difficulty === player.difficulty);
            const shuffled = shuffleQuestions(filtered);
            setFilteredQuestions(shuffled);
        }
    }, [player]);

    const startGame = useCallback((username: string, difficulty: 1 | 2) => {
        setPlayer({ username, score: 0, difficulty });
        setGameState({
            currentQuestionIndex: 0,
            score: 0,
            timeLeft: GAME_DURATION,
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
                const newScore = isCorrect ? prev.score + 10 : prev.score;
                const newTime = isCorrect ? prev.timeLeft + TIME_BONUS : prev.timeLeft - 2;

                const nextIndex = prev.currentQuestionIndex + 1;
                const isFinished = nextIndex >= filteredQuestions.length;

                if (isFinished) {
                    return {
                        ...prev,
                        score: newScore,
                        timeLeft: newTime,
                        answers: [...prev.answers, answerIndex],
                        isPlaying: false,
                        isGameOver: true,
                    };
                }

                return {
                    ...prev,
                    score: newScore,
                    timeLeft: newTime,
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
            timeLeft: GAME_DURATION,
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

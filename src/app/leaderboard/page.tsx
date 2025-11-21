"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameContainer } from "@/components/game/GameContainer";
import { useGame } from "@/lib/game-context";

interface LeaderboardEntry {
    username: string;
    score: number;
    date: string;
}

export default function LeaderboardPage() {
    const { gameState, player, resetGame } = useGame();
    const router = useRouter();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const hasSaved = useRef(false);

    useEffect(() => {
        const saveAndLoadScores = () => {
            // v2.0: Load leaderboard from localStorage
            const stored = localStorage.getItem("cyberquest_leaderboard");
            let scores: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];

            // Save current score if exists
            if (player && gameState.score > 0 && !hasSaved.current) {
                hasSaved.current = true;
                const newEntry: LeaderboardEntry = {
                    username: player.username,
                    score: gameState.score,
                    date: new Date().toISOString().split("T")[0],
                };
                scores.push(newEntry);

                // Sort by score descending and keep top 10
                scores = scores.sort((a, b) => b.score - a.score).slice(0, 10);

                // Save back to localStorage
                localStorage.setItem("cyberquest_leaderboard", JSON.stringify(scores));
            }

            setLeaderboard(scores);
            setLoading(false);
        };

        saveAndLoadScores();
    }, [player, gameState.score]);

    const handlePlayAgain = () => {
        resetGame();
        router.push("/");
    };

    const handleGoHome = () => {
        resetGame();
        router.push("/");
    };

    // Find current player's rank
    const currentPlayerRank = player ? leaderboard.findIndex(
        (entry) => entry.username === player.username && entry.score === gameState.score
    ) + 1 : 0;

    return (
        <GameContainer>
            <div className="text-center mb-8">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-block mb-4"
                >
                    <Trophy className="w-24 h-24 text-purple-400" />
                </motion.div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Mission Complete!
                </h1>
                {player && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl text-purple-100 space-y-2"
                    >
                        <p>
                            Agent <span className="font-bold text-purple-300">{player.username}</span>
                        </p>
                        <p className="text-4xl font-bold text-purple-400">{gameState.score} points</p>
                        {currentPlayerRank > 0 && (
                            <p className="text-sm text-purple-300">Rank #{currentPlayerRank} on the Leaderboard!</p>
                        )}
                    </motion.div>
                )}
            </div>

            <Card className="border-purple-500/30 bg-black/60 backdrop-blur-xl mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        Top Defenders
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-center text-purple-300">Loading...</p>
                    ) : leaderboard.length === 0 ? (
                        <p className="text-center text-purple-300">No scores yet. Be the first to play!</p>
                    ) : (
                        <div className="space-y-3">
                            {leaderboard.map((entry, index) => {
                                const isCurrentPlayer = player && entry.username === player.username && entry.score === gameState.score;
                                const rankColors = [
                                    "text-yellow-400 bg-yellow-500/10",
                                    "text-gray-300 bg-gray-500/10",
                                    "text-orange-400 bg-orange-500/10",
                                ];
                                const bgColor = isCurrentPlayer ? "bg-purple-500/20 border-purple-500/50" : "bg-slate-800/50";

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center gap-4 p-4 rounded-lg border ${bgColor} ${isCurrentPlayer ? "border-2" : "border-purple-500/20"
                                            }`}
                                    >
                                        <div
                                            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg ${index < 3 ? rankColors[index] : "text-purple-300 bg-slate-700"
                                                }`}
                                        >
                                            #{index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-purple-100 text-lg">
                                                {entry.username}
                                                {isCurrentPlayer && (
                                                    <span className="ml-2 text-xs text-purple-400">(You)</span>
                                                )}
                                            </p>
                                            <p className="text-sm text-purple-300">{entry.date}</p>
                                        </div>
                                        <div className="text-2xl font-bold text-purple-400">{entry.score}</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="flex gap-4 justify-center flex-wrap">
                <Button
                    onClick={handlePlayAgain}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 text-lg"
                >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Play Again
                </Button>
                <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="border-purple-500/50 hover:bg-purple-900/30 text-purple-300 font-bold px-8 py-3 text-lg"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Home
                </Button>
            </div>
        </GameContainer>
    );
}

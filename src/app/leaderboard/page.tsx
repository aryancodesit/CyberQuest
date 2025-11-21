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
    difficulty: number;
}

export default function LeaderboardPage() {
    const { gameState, player, resetGame } = useGame();
    const router = useRouter();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const hasSaved = useRef(false);

    useEffect(() => {
        const saveDataAndFetch = async () => {
            if (player && gameState.score > 0 && !hasSaved.current) {
                // Save score only once
                hasSaved.current = true;
                // For web version, we can just log it or use localStorage if needed
                console.log("Score saved (local session):", {
                    username: player.username,
                    score: gameState.score,
                    difficulty: player.difficulty,
                });
            }

            // Mock leaderboard for web version
            setLeaderboard([
                { username: "Neo", score: 2500, date: "2023-10-01", difficulty: 2 },
                { username: "Trinity", score: 2450, date: "2023-10-02", difficulty: 2 },
                { username: "Morpheus", score: 2300, date: "2023-10-03", difficulty: 1 },
            ]);
            setLoading(false);
        };

        saveDataAndFetch();
    }, [player, gameState.score]);

    const handlePlayAgain = () => {
        resetGame();
        router.push("/");
    };

    return (
        <GameContainer>
            <div className="text-center mb-8">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className="inline-block p-6 rounded-full bg-yellow-500/20 border border-yellow-500/50 mb-4 shadow-[0_0_40px_rgba(234,179,8,0.3)]"
                >
                    <Trophy className="w-20 h-20 text-yellow-400" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white mb-2">Mission Complete</h1>
                <p className="text-purple-200 text-xl">
                    Agent <span className="font-bold text-white">{player?.username || "Unknown"}</span>
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
                <Card className="border-purple-500/30 bg-black/60 backdrop-blur-xl h-fit">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl text-purple-100">Debriefing</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <div className="space-y-2">
                            <p className="text-muted-foreground uppercase tracking-widest text-sm">Final Score</p>
                            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-400">
                                {gameState.score}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            <div>
                                <p className="text-muted-foreground text-xs uppercase">Difficulty</p>
                                <p className="font-bold text-lg">{player?.difficulty === 1 ? "Beginner" : "Advanced"}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-xs uppercase">Status</p>
                                <p className="font-bold text-lg text-green-400">Secure</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <Button onClick={handlePlayAgain} variant="cyber" className="w-full">
                                <RotateCcw className="w-4 h-4 mr-2" /> Re-Initialize
                            </Button>
                            <Button onClick={() => router.push("/")} variant="ghost" className="w-full">
                                <Home className="w-4 h-4 mr-2" /> Return to Base
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-purple-500/30 bg-black/60 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-100">
                            <Trophy className="w-5 h-5 text-yellow-500" /> Top Agents
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-8 text-muted-foreground">Decrypting data...</div>
                        ) : (
                            <div className="space-y-4">
                                {leaderboard.map((entry, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`font-mono font-bold w-6 text-center ${i === 0 ? "text-yellow-400" : "text-muted-foreground"}`}>
                                                #{i + 1}
                                            </span>
                                            <span className="font-medium text-white">{entry.username}</span>
                                        </div>
                                        <span className="font-mono text-purple-400 font-bold">{entry.score}</span>
                                    </div>
                                ))}

                                {leaderboard.length === 0 && (
                                    <div className="text-center py-4 text-muted-foreground">No records found.</div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </GameContainer>
    );
}

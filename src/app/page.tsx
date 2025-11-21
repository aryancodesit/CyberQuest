"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, User, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GameContainer } from "@/components/game/GameContainer";
import { useGame } from "@/lib/game-context";

export default function Home() {
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState<1 | 2>(1);
  const { startGame } = useGame();
  const router = useRouter();

  const handleStart = () => {
    if (!username.trim()) return;
    startGame(username, difficulty);
    router.push("/game");
  };

  return (
    <GameContainer>
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="inline-block p-4 rounded-full bg-purple-500/10 border border-purple-500/50 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <Shield className="w-16 h-16 text-purple-400" />
        </motion.div>
        <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-2">
          CYBERQUEST
        </h1>
        <p className="text-muted-foreground text-lg">
          Test your defenses. Protect the network.
        </p>
      </div>

      <Card className="border-purple-500 hover:bg-purple-500/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-purple-100">Initialize Session</CardTitle>
          <CardDescription>Enter your credentials to begin the simulation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-200/80 flex items-center gap-2">
              <User className="w-4 h-4" /> Codename
            </label>
            <Input
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-950/50 border-purple-500/30 focus-visible:ring-purple-500/50 text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-200/80 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Security Clearance
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={difficulty === 1 ? "cyber" : "outline"}
                onClick={() => setDifficulty(1)}
                className="h-24 flex flex-col gap-2 hover:border-purple-400/50"
              >
                <span className="text-lg font-bold">Beginner</span>
                <span className="text-xs opacity-70 font-normal normal-case">
                  Basic internet usage
                </span>
              </Button>
              <Button
                variant={difficulty === 2 ? "cyber" : "outline"}
                onClick={() => setDifficulty(2)}
                className="h-24 flex flex-col gap-2 hover:border-purple-400/50"
              >
                <span className="text-lg font-bold">Advanced</span>
                <span className="text-xs opacity-70 font-normal normal-case">
                  IT Professional / Admin
                </span>
              </Button>
            </div>
          </div>

          <Button
            className="w-full text-lg py-6 mt-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            variant="cyber"
            onClick={handleStart}
            disabled={!username.trim()}
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            START SIMULATION
          </Button>
        </CardContent>
      </Card>
    </GameContainer>
  );
}

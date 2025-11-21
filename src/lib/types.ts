export interface Question {
    id: string;
    title: string;
    image?: string;
    answers: string[];
    correctAnswer: number; // Index of the correct answer
    difficulty: 1 | 2; // 1: Beginner, 2: Advanced
    details: string; // Explanation shown after answering
}

export interface Player {
    username: string;
    score: number;
    difficulty: 1 | 2;
}

export interface GameState {
    currentQuestionIndex: number;
    score: number;
    timeLeft: number;
    isGameOver: boolean;
    isPlaying: boolean;
    answers: number[]; // Store user answers
}

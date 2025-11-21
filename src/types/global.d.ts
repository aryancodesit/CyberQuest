export { };

declare global {
    interface Window {
        electron: {
            getLeaderboard: () => Promise<any[]>;
            saveScore: (data: any) => Promise<{ success: boolean; error?: string }>;
        };
    }
}

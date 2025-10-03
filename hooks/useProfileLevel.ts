import { useMemo } from 'react';

interface ProfileLevelData {
    level: number;
    currentXP: number;
    xpForNextLevel: number;
    progressPercent: number;
}

export function useProfileLevel(xp: number): ProfileLevelData {
    const baseXP = 100;

    const { level, currentXP, xpForNextLevel, progressPercent } = useMemo(() => {
        let totalXP = xp;
        let level = 1;
        let requiredXP = baseXP;

        while (totalXP >= requiredXP) {
            totalXP -= requiredXP;
            level += 1;
            requiredXP = baseXP * level;
        }

        const progressPercent = Math.round((totalXP / requiredXP) * 100);

        return {
            level,
            currentXP: totalXP,
            xpForNextLevel: requiredXP,
            progressPercent,
        };
    }, [xp]);

    return { level, currentXP, xpForNextLevel, progressPercent };
}

export function calculateXP({ correctAnswers, streak, completed }: {
    correctAnswers: number;
    streak: number;
    completed: boolean;
}): number {
    const baseXP = correctAnswers * 2;
    const streakBonus = streak >= 5 ? Math.floor(streak * 1.5) : 0;
    const completionBonus = completed ? 10 : 0;

    return baseXP + streakBonus + completionBonus;
}
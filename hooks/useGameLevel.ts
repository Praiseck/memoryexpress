import { useCallback, useEffect, useRef, useState } from 'react';
import { useUserStats } from './useUserStats';

interface GameLevelHook {
  streak: number;
  level: number;
  levelUp: boolean;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
}

export function useGameLevel(): GameLevelHook {
  const { stats, updateStats } = useUserStats();

  const streak: number = stats?.streak ?? 0;
  const level: number = Math.floor(streak / 5) + 1;

  const [levelUp, setLevelUp] = useState<boolean>(false);
  const previousLevel = useRef<number>(level);

  useEffect(() => {
    if (level > previousLevel.current) {
      setLevelUp(true);
      previousLevel.current = level;

      const timeout = setTimeout(() => setLevelUp(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [level]);

  const handleCorrectAnswer = useCallback(() => {
    const newStreak = streak + 1;
    const newLevel = Math.floor(newStreak / 5) + 1;

    updateStats({
      streak: newStreak,
      level: newLevel,
    });
  }, [streak, updateStats]);

  const handleWrongAnswer = useCallback(() => {
    updateStats({
      streak: 0,
      level: 1,
    });
    previousLevel.current = 1;
  }, [updateStats]);

  return {
    streak,
    level,
    levelUp,
    handleCorrectAnswer,
    handleWrongAnswer,
  };
}
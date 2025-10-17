import { useMemo } from 'react';
import { getProfileLevel, ProfileLevelData } from './getProfileLevel';

export function useProfileLevel(xp: number): ProfileLevelData {
  return useMemo(() => getProfileLevel(xp), [xp]);
}

export interface XPArgs {
  correctAnswers: number;
  streak: number;
  completed: boolean;
}

export function calculateXP({ correctAnswers, streak, completed }: XPArgs): number {
  const baseXP = correctAnswers * 2;
  const streakBonus = streak >= 5 ? Math.floor(streak * 1.5) : 0;
  const completionBonus = completed ? 10 : 0;

  return baseXP + streakBonus + completionBonus;
}
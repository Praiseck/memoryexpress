// utils/getProfileLevel.ts
export interface ProfileLevelData {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  progressPercent: number;
}

export function getProfileLevel(xp: number): ProfileLevelData {
  const baseXP = 100;
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
}
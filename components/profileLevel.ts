export function getProfileLevelFromXP(xp: number, baseXP = 100): number {
  let totalXP = xp;
  let level = 1;
  let requiredXP = baseXP;

  while (totalXP >= requiredXP) {
    totalXP -= requiredXP;
    level += 1;
    requiredXP = baseXP * level;
  }

  return level;
}
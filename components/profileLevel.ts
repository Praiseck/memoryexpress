/**
 * Calcula el nivel de perfil según la experiencia acumulada.
 *
 * El nivel se incrementa cada vez que el usuario acumula suficiente XP para superar el umbral,
 * que crece proporcionalmente al nivel actual (baseXP * nivel).
 *
 * @param xp - Experiencia total acumulada por el usuario.
 * @param baseXP - XP base requerida para alcanzar el primer nivel (por defecto 100).
 * @returns Nivel de perfil calculado.
 */
export function getProfileLevelFromXP(xp: number, baseXP: number = 100): number {
  let remainingXP = xp;
  let level = 1;
  let requiredXP = baseXP;

  while (remainingXP >= requiredXP) {
    remainingXP -= requiredXP;
    level += 1;
    requiredXP = baseXP * level;
  }

  return level;
}
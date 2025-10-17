import { getProfileLevel } from './getProfileLevel';
import { useUserStats } from './useUserStats';

interface FinalizeGameArgs {
  correctAnswers: number;
  streak: number;
  completed: boolean;
  earnedCoins: number;
  doubleReward: boolean;
}

// 🎁 Marcos desbloqueables por racha
function getUnlockedFrames(streak: number): string[] {
  const frames: string[] = [];
  if (streak >= 5) frames.push('frame_bronze');
  if (streak >= 10) frames.push('frame_silver');
  if (streak >= 15) frames.push('frame_gold');
  if (streak >= 20) frames.push('frame_fire');
  return frames;
}

interface UseFinalizeGameReturn {
  finalizeGame: (args: FinalizeGameArgs) => Promise<void>;
}

export function useFinalizeGame(): UseFinalizeGameReturn {
  const { stats, updateStats } = useUserStats();

  const finalizeGame = async ({
    correctAnswers,
    streak,
    completed,
    earnedCoins,
    doubleReward,
  }: FinalizeGameArgs): Promise<void> => {
    console.log('[FINALIZE] Se llamó finalizeGame con:', {
      correctAnswers,
      streak,
      completed,
      earnedCoins,
      doubleReward,
    });

    if (!stats) {
      console.warn('[FINALIZE] No se encontraron stats del usuario.');
      return;
    }

    const baseXP = correctAnswers * 2;
    const streakBonus = streak >= 5 ? Math.floor(streak * 1.5) : 0;
    const completionBonus = streak >= 10 ? 10 : 0;
    const earnedXP = baseXP + streakBonus + completionBonus;
    const finalXP = doubleReward ? earnedXP * 2 : earnedXP;

    if (isNaN(finalXP)) {
      console.error('[XP ERROR] XP calculado no es válido:', finalXP);
      return;
    }

    console.log('[XP CALCULO]');
    console.log(`✔️ Respuestas correctas: ${correctAnswers} → Base XP: ${baseXP}`);
    console.log(`🔥 Racha: ${streak} → Bonus de racha: ${streakBonus}`);
    console.log(`🏁 Bonus por racha larga: ${completionBonus}`);
    console.log(`🎬 Multiplicador aplicado: ${doubleReward ? 'Sí' : 'No'} → XP final: ${finalXP}`);

    const totalXP = stats.xp + finalXP;
    const { level: profileLevel } = getProfileLevel(totalXP);
    const bestStreak = Math.max(stats.bestStreak ?? 0, streak);

    const newFrames = getUnlockedFrames(streak);
    const currentUnlocked = stats.unlockedFrames ?? [];
    const updatedUnlocked = Array.from(new Set([...currentUnlocked, ...newFrames]));

    console.log('[PROGRESO]');
    console.log(`📊 XP anterior: ${stats.xp} → XP nuevo: ${totalXP}`);
    console.log(`🏅 Nivel calculado: ${profileLevel}`);
    console.log(`📈 Racha anterior: ${stats.bestStreak ?? 0} → Nueva racha: ${bestStreak}`);
    console.log(`🖼 Marcos desbloqueados:`, newFrames);

    await updateStats({
      coins: stats.coins + earnedCoins,
      totalEarned: stats.totalEarned + earnedCoins,
      xp: totalXP,
      profileLevel,
      bestStreak,
      unlockedFrames: updatedUnlocked,
    });

    console.log('[FINALIZE] Actualización completada.');
  };

  return { finalizeGame };
}
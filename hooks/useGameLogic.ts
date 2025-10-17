import { useEffect, useState } from 'react';
import { useFinalizeGame } from './useFinalizeGame';
import { useUserStats } from './useUserStats';

function generateSequence(pool: string[], count: number): string[] {
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
}

function pickMissingEmoji(sequence: string[]): string {
  return sequence[Math.floor(Math.random() * sequence.length)];
}

type GameLogicParams = {
  emojiPool: string[];
  sequenceLength: number;
  timeLimit: number;
};

interface GameSummary {
  xp: number;
  coins: number;
  streak: number;
  bestStreak: number;
  doubleReward: boolean;
}

interface GameLogicReturn {
  level: number;
  streak: number;
  sequence: string[];
  missingEmoji: string;
  showQuestion: boolean;
  timeLeft: number;
  hasFailed: boolean;
  continueAttempts: number;
  showFeedback: boolean;
  earnedThisRound: number;
  gameSummary: GameSummary | null;
  handleAnswer: (emoji: string) => void;
  resetGame: () => void;
  handleContinueAd: () => void;
  handleEndGame: () => void;
  handleDoubleCoins: () => void;
  setShowFeedback: (value: boolean) => void;
}

export function useGameLogic({
  emojiPool,
  sequenceLength,
  timeLimit,
}: GameLogicParams): GameLogicReturn {
  const { finalizeGame } = useFinalizeGame();
  const { stats } = useUserStats();

  const [streak, setStreak] = useState<number>(0);
  const [earnedThisRound, setEarnedThisRound] = useState<number>(0);

  const [sequence, setSequence] = useState<string[]>([]);
  const [missingEmoji, setMissingEmoji] = useState<string>('');
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [continueAttempts, setContinueAttempts] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);

  const maxContinues = 2;
  const level = Math.floor(streak / 5) + 1;

  const startNewRound = (): void => {
    const selected = generateSequence(emojiPool, sequenceLength);
    const missing = pickMissingEmoji(selected);

    setSequence(selected);
    setMissingEmoji(missing);
    setShowQuestion(false);
    setTimeLeft(timeLimit);
    setHasFailed(false);
  };

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceLength, timeLimit, continueAttempts, round]);

  useEffect(() => {
    if (timeLeft > 0 && !showQuestion) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowQuestion(true);
    }
  }, [timeLeft, showQuestion]);

  function getCoinsForAnswer(streak: number): number {
    if (streak < 5) return 2;
    if (streak < 15) return 5;
    return 10;
  }

  function handleAnswer(emoji: string): void {
    if (hasFailed || showFeedback) return;

    if (emoji === missingEmoji) {
      const coinsEarned = getCoinsForAnswer(streak);
      setEarnedThisRound((prev) => prev + coinsEarned);
      setStreak((prev) => prev + 1);
      setRound((prev) => prev + 1);
    } else {
      setHasFailed(true);
    }
  }

  function handleContinueAd(): void {
    if (continueAttempts < maxContinues) {
      setContinueAttempts((prev) => prev + 1);
      setHasFailed(false);
      setRound((prev) => prev + 1);
    }
  }

  async function finalizeAndEndGame(coins: number, doubleReward: boolean): Promise<void> {
    if (!stats) {
      console.warn('[GAME LOGIC] No se puede generar resumen: stats no disponible');
      return;
    }

    const correctAnswers = Math.floor(coins / 2);
    const baseXP = correctAnswers * 2;
    const streakBonus = streak >= 5 ? Math.floor(streak * 1.5) : 0;
    const completionBonus = streak >= 10 ? 10 : 0;
    const earnedXP = baseXP + streakBonus + completionBonus;
    const finalXP = doubleReward ? earnedXP * 2 : earnedXP;

    await finalizeGame({
      correctAnswers,
      streak,
      completed: true,
      earnedCoins: coins,
      doubleReward,
    });

    setGameSummary({
      xp: finalXP,
      coins,
      streak,
      bestStreak: Math.max(streak, stats.bestStreak ?? 0),
      doubleReward,
    });

    console.log('[GAME LOGIC] Resumen generado:', {
      xp: finalXP,
      coins,
      streak,
      bestStreak: Math.max(streak, stats.bestStreak ?? 0),
      doubleReward,
    });

    setShowFeedback(true);
  }

  function handleEndGame(): void {
    finalizeAndEndGame(earnedThisRound, false);
  }

  function handleDoubleCoins(): void {
    const doubled = earnedThisRound * 2;
    setEarnedThisRound(doubled);
    finalizeAndEndGame(doubled, true);
  }

  function resetGame(): void {
    setStreak(0);
    setEarnedThisRound(0);
    setHasFailed(false);
    setContinueAttempts(0);
    setShowFeedback(false);
    setGameSummary(null);
    setRound(0);
    startNewRound();
  }

  useEffect(() => {
    if (hasFailed && continueAttempts >= maxContinues) {
      setShowFeedback(true);
    }
  }, [hasFailed, continueAttempts]);

  return {
    level,
    streak,
    sequence,
    missingEmoji,
    showQuestion,
    timeLeft,
    hasFailed,
    continueAttempts,
    showFeedback,
    earnedThisRound,
    gameSummary,
    handleAnswer,
    resetGame,
    handleContinueAd,
    handleEndGame,
    handleDoubleCoins,
    setShowFeedback,
  };
}
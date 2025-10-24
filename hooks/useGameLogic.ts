import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { useFinalizeGame } from './useFinalizeGame';
import { useUserStats } from './useUserStats';

const easyEmojis = ['😀', '🐶', '🍎', '🚗', '🎈', '🌞', '🏠', '📚'];
const mediumEmojis = ['😃', '😄', '😅', '😆', '😂', '🤣', '😊', '😇'];
const hardEmojis = ['🙂', '🙃', '😐', '😑', '😶', '😏', '😒', '😔'];

function getGameConfig(streak: number) {
  if (streak >= 25) {
    return { emojiPool: hardEmojis, sequenceLength: 4, timeLimit: 3 };
  } else if (streak >= 10) {
    return { emojiPool: mediumEmojis, sequenceLength: 4, timeLimit: 4 };
  } else {
    return { emojiPool: easyEmojis, sequenceLength: 3, timeLimit: 5 };
  }
}

function generateSequence(pool: string[], count: number): string[] {
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
}

function pickMissingEmoji(sequence: string[]): string {
  return sequence[Math.floor(Math.random() * sequence.length)];
}

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
  emojiPool: string[];
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

export function useGameLogic(): GameLogicReturn {
  const { finalizeGame } = useFinalizeGame();
  const { stats } = useUserStats();

  const [streak, setStreak] = useState(0);
  const [earnedThisRound, setEarnedThisRound] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [missingEmoji, setMissingEmoji] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [hasFailed, setHasFailed] = useState(false);
  const [continueAttempts, setContinueAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [round, setRound] = useState(0);
  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);
  const { emojiPool, sequenceLength, timeLimit } = getGameConfig(streak);

  const maxContinues = 2;
  const level = Math.floor(streak / 5) + 1;

  const startNewRound = () => {
    const { emojiPool, sequenceLength, timeLimit } = getGameConfig(streak);
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
  }, [streak, continueAttempts, round]);

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

  function handleAnswer(emoji: string) {
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

  async function handleContinueAd() {
    if (continueAttempts < maxContinues && stats?.uid) {
      setContinueAttempts((prev) => prev + 1);
      setHasFailed(false);
      setRound((prev) => prev + 1);

      try {
        await updateDoc(doc(db, 'users', stats.uid), {
          videosWatchedToday: (stats.videosWatchedToday ?? 0) + 1,
        });
      } catch (error) {
        console.error('[GAME LOGIC] Error al registrar video visto:', error);
      }
    }
  }

  async function finalizeAndEndGame(coins: number, doubleReward: boolean) {
    if (!stats) return;

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

    try {
      const userRef = doc(db, 'users', stats.uid);
      const today = dayjs().format('YYYY-MM-DD');

      await updateDoc(userRef, {
        gamesPlayedToday: (stats.gamesPlayedToday ?? 0) + 1,
        bestStreakToday: Math.max(streak, stats.bestStreakToday ?? 0),
        lastLoginDate: today,
      });
    } catch (error) {
      console.error('[GAME LOGIC] Error al actualizar stats diarios:', error);
    }

    setGameSummary({
      xp: finalXP,
      coins,
      streak,
      bestStreak: Math.max(streak, stats.bestStreak ?? 0),
      doubleReward,
    });

    setShowFeedback(true);
  }

  function handleEndGame() {
    finalizeAndEndGame(earnedThisRound, false);
  }

  function handleDoubleCoins() {
    const doubled = earnedThisRound * 2;
    setEarnedThisRound(doubled);
    finalizeAndEndGame(doubled, true);
  }

  function resetGame() {
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
    emojiPool,
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
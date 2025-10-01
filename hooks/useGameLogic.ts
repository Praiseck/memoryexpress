import { useEffect, useState } from 'react';

export function useGameLogic(emojiPool: string[]) {
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [earnedThisRound, setEarnedThisRound] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [missingEmoji, setMissingEmoji] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    const count = Math.min(3 + Math.floor(level / 3), 5);
    const selected = [...emojiPool].sort(() => 0.5 - Math.random()).slice(0, count);
    const missing = selected[Math.floor(Math.random() * selected.length)];
    setSequence(selected);
    setMissingEmoji(missing);
    setShowQuestion(false);
    setTimeLeft(Math.max(6 - Math.floor(level / 3), 3));
  }, [level]);

  useEffect(() => {
    if (timeLeft > 0 && !showQuestion) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowQuestion(true);
    }
  }, [timeLeft, showQuestion]);

  const handleAnswer = (emoji: string) => {
    if (emoji === missingEmoji) {
      const earned = 10 + streak * 5;
      setEarnedThisRound(prev => prev + earned);
      setStreak(prev => prev + 1);
      setLevel(prev => prev + 1);
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setLevel(1);
    setStreak(0);
    setEarnedThisRound(0);
  };

  return {
    level,
    streak,
    earnedThisRound,
    sequence,
    missingEmoji,
    showQuestion,
    timeLeft,
    handleAnswer,
    resetGame,
    setShowQuestion,
  };
}
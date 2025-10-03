import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GameHeader } from '../components/gameHeader';
import { GameModal } from '../components/gameModal';
import { getProfileLevelFromXP } from '../components/profileLevel';
import { calculateXP, useProfileLevel } from '../hooks/useProfileLevel';
import { useUserStats } from '../hooks/useUserStats';
import { styles } from '../screens/game.styles';



const emojiPool = ['🐶', '🍎', '🚗', '🐱', '🍌', '⚽', '🎈', '🌟', '🦄'];

const getEmojiCount = (level: number): number => level <= 5 ? 3 : 4;

const getMemorizeTime = (level: number): number => {
  if (level <= 5) return 5;
  const reductions = Math.floor((level - 6) / 3) + 1;
  const rawTime = 5 - reductions * 0.5;
  return Math.max(Math.round(rawTime * 10) / 10, 2);
};

export default function GameScreen(): React.ReactElement {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const avatarFile = Array.isArray(params.avatar) ? params.avatar[0] : params.avatar ?? 'avataaars17.png';
  const frameFile = Array.isArray(params.frame) ? params.frame[0] : params.frame ?? 'frame1.png';
  const userNick = Array.isArray(params.nick) ? params.nick[0] : params.nick ?? 'Jugador123';
  const [showLevelUpMessage, setShowLevelUpMessage] = useState(false);

  const { stats, updateStats } = useUserStats();

  const [coins, setCoins] = useState<number | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [earnedThisRound, setEarnedThisRound] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [usedContinueAd, setUsedContinueAd] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showEndMenu, setShowEndMenu] = useState(false);
  const [showEndOptions, setShowEndOptions] = useState(false);
  const [roundKey, setRoundKey] = useState(0);
  const [continueAttempts, setContinueAttempts] = useState(0);
  const [rewardVideoUsed, setRewardVideoUsed] = useState(false);

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    if (stats) {
      setCoins(stats.coins);
      setStreak(stats.streak);
      setLevel(stats.level);
    }
  }, [stats]);

  const emojiCount = getEmojiCount(level ?? 1);
  const memorizeTime = getMemorizeTime(level ?? 1);
  const screenWidth = Dimensions.get('window').width;
  const emojiSize = emojiCount > 3 ? screenWidth / 6 : screenWidth / 5;
  const newStreak = (stats?.streak ?? 0) + 1;
  const newLevel = newStreak % 5 === 0 ? (stats?.level ?? 1) + 1 : stats?.level ?? 1;


  const sequence = useMemo(() => {
    return emojiPool.sort(() => 0.5 - Math.random()).slice(0, emojiCount);
  }, [emojiCount, roundKey]);

  const { missingEmoji, options } = useMemo(() => {
    const chosen = sequence[Math.floor(Math.random() * sequence.length)];
    const distractors = emojiPool.filter(e => !sequence.includes(e));
    const randomDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    const mixedOptions = [...randomDistractors, chosen].sort(() => 0.5 - Math.random());
    return { missingEmoji: chosen, options: mixedOptions };
  }, [sequence, roundKey]);

  useEffect(() => {
    if (!showQuestion && !hasFailed) {
      const timeout = setTimeout(() => {
        setShowQuestion(true);
      }, memorizeTime * 1000);

      return () => clearTimeout(timeout);
    }
  }, [memorizeTime, showQuestion, roundKey, hasFailed]);

  const handleAnswer = (emoji: string): boolean => {
    setSelectedEmoji(emoji);
    const correct = emoji === missingEmoji;
    setIsCorrectAnswer(correct);

    if (correct) {
      const earned = (streak ?? 0) >= 5 ? 5 : 2;
      setEarnedThisRound(prev => prev + earned);
      const newStreak = (streak ?? 0) + 1;
      const newLevel = (level ?? 1) + 1;

      // Detectar si se alcanzó el nivel
      const progressBefore = (streak ?? 0) % 5;
      const progressAfter = newStreak % 5;
      if (progressBefore === 4 && progressAfter === 0) {
        setShowLevelUpMessage(true);
        setTimeout(() => setShowLevelUpMessage(false), 2000);
      }

      setStreak(newStreak);
      setLevel(newLevel);
      updateStats({ streak: newStreak, level: newLevel });
      setShowEndOptions(true);
    } else {
      if (continueAttempts >= 2) {
        setShowRewardModal(false);
        setShowEndMenu(true);
        setShowEndOptions(false);
      } else {
        setHasFailed(true);
        setShowRewardModal(true);
      }
    }

    setShowQuestion(true);

    if (correct) {
      setTimeout(() => {
        setShowQuestion(false);
        setRoundKey(prev => prev + 1);
        setSelectedEmoji(null);
        setIsCorrectAnswer(null);
      }, 1000);
    }

    return correct;
  };

  const handleContinueAd = () => {
    const nextAttempt = continueAttempts + 1;
    setContinueAttempts(nextAttempt);

    setUsedContinueAd(true);
    setHasFailed(false);
    setShowRewardModal(false);
    setShowQuestion(false);
    setRoundKey(prev => prev + 1);
    setSelectedEmoji(null);
    setIsCorrectAnswer(null);
  };

  const handleEndGame = () => {
    setShowRewardModal(false);
    setShowEndMenu(true);
    setShowEndOptions(false);
  };

  const handleDoubleRewardAd = () => {
    if (rewardVideoUsed || coins === null || stats === null) return;

    const total = coins + earnedThisRound * 2;
    setCoins(total);

    const earnedXP = calculateXP({
      correctAnswers: earnedThisRound * 2,
      streak: stats.streak,
      completed: true,
    });

    const totalXP = stats.xp + earnedXP;
    const newProfileLevel = useProfileLevel(totalXP).level;

    updateStats({
      coins: total,
      totalEarned: stats.totalEarned + earnedThisRound * 2,
      streak: 0,
      level: 1,
      xp: totalXP,
      profileLevel: newProfileLevel,
    });

    setRewardVideoUsed(true);
    setShowEndOptions(true);
  };

  const handleFinishWithoutAd = () => {
    if (coins === null || stats === null) return;

    const total = coins + earnedThisRound;
    setCoins(total);

    const earnedXP = calculateXP({
      correctAnswers: earnedThisRound,
      streak: stats.streak,
      completed: true,
    });

    const totalXP = stats.xp + earnedXP;
    const newProfileLevel = getProfileLevelFromXP(totalXP);

    updateStats({
      xp: totalXP,
      profileLevel: newProfileLevel,
      streak: newStreak,
      level: newLevel,
      totalEarned: stats.totalEarned + earnedThisRound,
    });

    setShowEndOptions(true);
  };

  const handleRestart = () => {
    setLevel(1);
    setStreak(0);
    setEarnedThisRound(0);
    setShowQuestion(false);
    setHasFailed(false);
    setShowRewardModal(false);
    setShowEndMenu(false);
    setShowEndOptions(false);
    setRoundKey(prev => prev + 1);
    setSelectedEmoji(null);
    setIsCorrectAnswer(null);
    setContinueAttempts(0);
    setRewardVideoUsed(false);
  };

  const handleGoHome = () => {
    handleRestart();
    router.push('/home');
  };

  if (coins === null || streak === null || level === null) {
    return <Text style={{ color: '#fff', textAlign: 'center' }}>Cargando partida...</Text>;
  }

  const progressToNextLevel = Math.min((streak % 5), 5);
  const progressPercent = Math.round((progressToNextLevel / 5) * 100);

  return (
    <View style={styles.container}>
      <GameHeader avatarFile={avatarFile} frameFile={frameFile} nick={userNick} level={level} coins={coins} />

      {showLevelUpMessage && (
        <View style={styles.levelUpMessage}>
          <Text style={styles.levelUpText}>🎉 ¡Nivel alcanzado!</Text>
        </View>
      )}

      <View style={styles.status}>
        <Text style={styles.level}>Nivel {level}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressText}>Progreso: {progressPercent}%</Text>
        <Text style={styles.streak}>Racha: {streak}</Text>
        <Text style={styles.earned}>Ganadas esta ronda: {earnedThisRound} 🪙</Text>
      </View>

      <View style={styles.gameArea}>
        {!showQuestion ? (
          <View style={styles.sequenceBlock}>
            <View style={styles.sequence}>
              {sequence.map((emoji, i) => (
                <Text key={i} style={[styles.emoji, { fontSize: emojiSize }]}>{emoji}</Text>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.questionBlock}>
            <Text style={styles.question}>¿Cuál emoji falta?</Text>
            <View style={styles.sequence}>
              {sequence.map((emoji, i) => (
                <Text key={i} style={[styles.emoji, { fontSize: emojiSize }]}>
                  {emoji === missingEmoji ? '❓' : emoji}
                </Text>
              ))}
            </View>
            <View style={styles.options}>
              {options.map((emoji, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAnswer(emoji)}
                  disabled={selectedEmoji !== null}
                  style={[
                    styles.option,
                    selectedEmoji === emoji && isCorrectAnswer === true && { backgroundColor: '#4CAF50' },
                    selectedEmoji === emoji && isCorrectAnswer === false && { backgroundColor: '#F44336' },
                  ]}
                >
                  <Text style={{ fontSize: emojiSize, color: '#fff' }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        )}

      </View>

      <GameModal
        showRewardModal={showRewardModal}
        hasFailed={hasFailed}
        showEndMenu={showEndMenu}
        showEndOptions={showEndOptions}
        earnedThisRound={earnedThisRound}
        onContinueAd={handleContinueAd}
        onEndGame={handleEndGame}
        onDoubleRewardAd={handleDoubleRewardAd}
        onFinishWithoutAd={handleFinishWithoutAd}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
      />
      <View style={styles.bannerPlaceholder}>
        {/* Espacio reservado para el banner de anuncios */}
      </View>
    </View>

  );
}
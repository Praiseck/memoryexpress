import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GameHeader } from '../components/gameHeader';
import { GameModal } from '../components/gameModal';
import { useUserStats } from '../hooks/useUserStats';
import { styles } from '../screens/game.styles';

const emojiPool = ['🐶', '🍎', '🚗', '🐱', '🍌', '⚽', '🎈', '🌟', '🦄'];

const getEmojiCount = (level: number): number => level <= 5 ? 3 : 4;

const getMemorizeTime = (level: number): number => {
  if (level <= 5) return 5;
  const reductions = Math.floor((level - 6) / 3) + 1;
  const rawTime = 5 - reductions * 0.5;
  return Math.max(Math.round(rawTime * 10) / 10, 2); // redondea a 1 decimal
};

export default function GameScreen(): React.ReactElement {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const avatarFile = Array.isArray(params.avatar) ? params.avatar[0] : params.avatar ?? 'avataaars17.png';
  const frameFile = Array.isArray(params.frame) ? params.frame[0] : params.frame ?? 'frame1.png';
  const userNick = Array.isArray(params.nick) ? params.nick[0] : params.nick ?? 'Jugador123';

  const { stats, updateStats } = useUserStats();

  const [level, setLevel] = useState(stats?.level ?? 1);
  const [streak, setStreak] = useState(stats?.streak ?? 0);
  const [coins, setCoins] = useState(stats?.coins ?? 250);
  const [earnedThisRound, setEarnedThisRound] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [usedContinueAd, setUsedContinueAd] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showEndMenu, setShowEndMenu] = useState(false);
  const [showEndOptions, setShowEndOptions] = useState(false);
  const [roundKey, setRoundKey] = useState(0);

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

  const emojiCount = getEmojiCount(level);
  const memorizeTime = getMemorizeTime(level);
  const screenWidth = Dimensions.get('window').width;
  const emojiSize = screenWidth / 5;

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
      const earned = 10 + level * 2;
      setEarnedThisRound(earned);
      setLevel(prev => prev + 1);
      setStreak(prev => prev + 1);
      setShowEndOptions(true);
    } else {
      setHasFailed(true);
      setShowRewardModal(true);
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
  };

  const handleDoubleRewardAd = () => {
    const total = coins + earnedThisRound * 2;
    setCoins(total);
    updateStats({ coins: total, totalEarned: (stats?.totalEarned ?? 0) + earnedThisRound * 2, streak: 0, level: 1 });
    setShowEndOptions(true);
  };

  const handleFinishWithoutAd = () => {
    const total = coins + earnedThisRound;
    setCoins(total);
    updateStats({ coins: total, totalEarned: (stats?.totalEarned ?? 0) + earnedThisRound, streak: 0, level: 1 });
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
  };

  const handleGoHome = () => {
    handleRestart();
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <GameHeader avatarFile={avatarFile} frameFile={frameFile} nick={userNick} coins={coins} />

      <View style={styles.status}>
        <Text style={styles.level}>Nivel {level}</Text>
        <Text style={styles.streak}>Racha: {streak}</Text>
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
    </View>
  );
}
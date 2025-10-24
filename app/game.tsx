import { WortiseBanner } from '@wortise/react-native-sdk';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { JSX, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameHeader } from '../components/gameHeader';
import { GameModal } from '../components/gameModal';
import { OptionsDisplay } from '../components/optionsDisplay2';
import { ProgressBar } from '../components/ProgressBar';
import { SequenceDisplay } from '../components/SequenceDisplay';
import { useGameLogic } from '../hooks/useGameLogic';
import { useUserStats } from '../hooks/useUserStats';
import { useWortiseRewarded } from '../hooks/useWortiseRewarded';
import { styles } from '../screens/game.styles';

const GameScreen: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { stats, updateStats } = useUserStats();
  const { showRewardedAd } = useWortiseRewarded();
  const gameLogic = useGameLogic();

  const [showEndMenu, setShowEndMenu] = useState(false);
  const [showEndOptions, setShowEndOptions] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
  const [incorrectSound, setIncorrectSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSounds = async () => {
      const { sound: correct } = await Audio.Sound.createAsync(
        require('../assets/sounds/correcto.mp3')
      );
      const { sound: incorrect } = await Audio.Sound.createAsync(
        require('../assets/sounds/incorrecto.mp3')
      );
      setCorrectSound(correct);
      setIncorrectSound(incorrect);
    };

    loadSounds();

    return () => {
      correctSound?.unloadAsync();
      incorrectSound?.unloadAsync();
    };
  }, []);

  const options = useMemo(() => {
    const distractors = gameLogic.emojiPool.filter(e => !gameLogic.sequence.includes(e));
    const randomDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [gameLogic.missingEmoji, ...randomDistractors].sort(() => 0.5 - Math.random());
  }, [gameLogic.sequence, gameLogic.missingEmoji, gameLogic.emojiPool]);

  const handleAnswerWithFeedback = async (emoji: string) => {
    const correct = emoji === gameLogic.missingEmoji;
    setSelectedEmoji(emoji);
    setIsCorrect(correct);

    if (correct) {
      await correctSound?.replayAsync();
    } else {
      await incorrectSound?.replayAsync();
    }

    setTimeout(() => {
      gameLogic.handleAnswer(emoji);
      setSelectedEmoji(null);
      setIsCorrect(null);
    }, 1000);
  };

  const handleGoHome = () => {
    if (stats) {
      updateStats({
        coins: (stats.coins ?? 0) + gameLogic.earnedThisRound,
        streak: gameLogic.streak,
        level: gameLogic.level,
      });
    }
    setShowEndMenu(false);
    setShowEndOptions(false);
    setShowFeedback(false);
    gameLogic.resetGame();
    router.replace('/homeScreen');
  };

  const setShowFeedback = gameLogic.setShowFeedback;

  const handleEndGameFlow = async () => {
    await gameLogic.handleEndGame();
    setShowEndMenu(true);
    setShowEndOptions(true);
    setShowFeedback(false);
  };

  const handleDoubleRewardFlow = async () => {
    showRewardedAd();
    await gameLogic.handleDoubleCoins();
    setShowEndMenu(true);
    setShowEndOptions(true);
    setShowFeedback(false);
  };

  if (!stats) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameHeader
          avatarFile="avataaars17.png"
          frameFile="free.png"
          nick="..."
          level={gameLogic.level}
          coins={0}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GameHeader
          avatarFile={stats.avatar ?? 'avataaars17.png'}
          frameFile={stats.frame ?? 'free.png'}
          nick={stats.nick}
          level={gameLogic.level}
          coins={(stats.coins ?? 0) + gameLogic.earnedThisRound}
        />
        <ProgressBar level={gameLogic.level} streak={gameLogic.streak} />

        <Text style={styles.difficultyText}>
          Dificultad: {gameLogic.streak <= 10 ? 'Fácil' : gameLogic.streak <= 25 ? 'Media' : 'Alta'}
        </Text>

        <SequenceDisplay
          sequence={gameLogic.sequence}
          timeLeft={gameLogic.timeLeft}
          showQuestion={gameLogic.showQuestion}
          missingEmoji={gameLogic.missingEmoji}
        />

        <OptionsDisplay
          options={options}
          showQuestion={gameLogic.showQuestion && !gameLogic.hasFailed}
          onSelect={handleAnswerWithFeedback}
          selectedEmoji={selectedEmoji}
          isCorrect={isCorrect}
        />

        {/* ✅ Banner de Wortise */}
        <View style={styles.banner}>
          <WortiseBanner adUnitId="5ed6529d-721f-4a57-ac97-2a91dc72b614" />
        </View>

        <GameModal
          showRewardModal={gameLogic.hasFailed && gameLogic.continueAttempts < 2}
          hasFailed={gameLogic.hasFailed}
          showEndMenu={showEndMenu || gameLogic.showFeedback}
          showEndOptions={showEndOptions}
          earnedThisRound={gameLogic.earnedThisRound}
          gameSummary={gameLogic.gameSummary}
          onContinueAd={gameLogic.handleContinueAd}
          onEndGame={handleEndGameFlow}
          onDoubleRewardAd={handleDoubleRewardFlow}
          onFinishWithoutAd={handleEndGameFlow}
          onRestart={() => {
            setShowEndMenu(false);
            setShowEndOptions(false);
            setShowFeedback(false);
            gameLogic.resetGame();
          }}
          onGoHome={handleGoHome}
        />
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;
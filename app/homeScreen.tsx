import { WortiseBanner } from '@wortise/react-native-sdk';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/Styles/home.styles';
import { DailyRewardModal } from '../components/dailyRewardModal';
import { HomeActions } from '../components/homeActions';
import { HomeHeader } from '../components/homeHeader';
import { LevelUpMessage } from '../components/levelUpMessage';
import { ProfileProgressBar } from '../components/profileProgressBar';
import { useDailyReward } from '../hooks/useDailyReward';
import { useProfileLevel } from '../hooks/useProfileLevel';
import { useProfileLevelUp } from '../hooks/useProfileLevelUp';
import { useUserStats } from '../hooks/useUserStats';

const HomeScreen: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { stats, loading, reloadStats } = useUserStats();

  const xp = stats?.xp ?? 0;
  const coins = stats?.coins ?? 0;

  const { level, progressPercent, currentXP, xpForNextLevel } = useProfileLevel(xp);
  const levelUp = useProfileLevelUp(level);

  const scaleAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
  const previousCoins = useRef<number | null>(null);
  const dummyScale = new Animated.Value(1);

  const { canClaim, claimReward, streak, loading: rewardLoading } = useDailyReward();
  const [showRewardModal, setShowRewardModal] = useState(false);

  useEffect(() => {
    if (canClaim && !rewardLoading) {
      setShowRewardModal(true);
    }
  }, [canClaim, rewardLoading]);

  useEffect(() => {
    if (coins != null && previousCoins.current != null && coins !== previousCoins.current) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
    previousCoins.current = coins;
  }, [coins]);

  useFocusEffect(
    React.useCallback(() => {
      reloadStats(); // ← recarga datos al volver del perfil
    }, [reloadStats])
  );

  if (loading || !stats) {
    return <Text style={styles.loading}>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <HomeHeader
        avatarFile={stats.avatar ?? 'avataaars17.png'}
        frameFile={stats.frame ?? 'free.png'}
        nick={stats.nick ?? 'Jugador'}
        coins={stats.coins ?? 0}
        coinsScale={dummyScale}
      />

      {levelUp && <LevelUpMessage level={level} />}

      <ProfileProgressBar level={level} progressPercent={progressPercent} />

      <Text style={styles.motivationText}>
        ¡Te faltan {xpForNextLevel - currentXP} XP para el nivel {level + 1}!
      </Text>

      <TouchableOpacity style={styles.playButton} onPress={() => router.push('/game')}>
        <Text style={styles.playText}>Jugar</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <HomeActions />
      </View>

      {/* ✅ Banner de Wortise */}
      <View style={styles.adBanner}>
        <WortiseBanner adUnitId="5ed6529d-721f-4a57-ac97-2a91dc72b614" />
      </View>

      <DailyRewardModal
        visible={showRewardModal}
        onClaim={() => {
          claimReward();
          setShowRewardModal(false);
        }}
        onClose={() => setShowRewardModal(false)}
        streak={streak}
      />
    </View>
  );
};

export default HomeScreen;
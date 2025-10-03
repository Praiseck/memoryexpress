import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/home.styles';
import { HomeActions } from '../components/homeActions';
import { HomeHeader } from '../components/homeHeader';
import { HomeStats } from '../components/homeStats';
import { useUserStats } from '../hooks/useUserStats';

export default function HomeScreen(): React.ReactElement {
  const router = useRouter();
  const { stats, loading } = useUserStats();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const previousCoins = useRef<number | null>(null);

  useEffect(() => {
    if (stats?.coins != null && previousCoins.current != null && stats.coins !== previousCoins.current) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
    previousCoins.current = stats?.coins ?? null;
  }, [stats?.coins]);

  if (loading || !stats) return <Text style={styles.loading}>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <HomeHeader
        avatarFile={stats.avatar ?? 'avataaars17.png'}
        frameFile={stats.frame ?? 'frame1.png'}
        nick={stats.nick}
        coins={stats.coins}
        coinsScale={scaleAnim} // ✅ nueva prop animada
      />

      <HomeStats
        profileLevel={stats.profileLevel}
        streak={stats.streak}
        totalEarned={stats.totalEarned}
      />

      <TouchableOpacity style={styles.playButton} onPress={() => router.push('/game')}>
        <Text style={styles.playText}>Jugar</Text>
      </TouchableOpacity>

      <HomeActions />
      <View style={styles.bannerPlaceholder} />
    </View>
  );
}
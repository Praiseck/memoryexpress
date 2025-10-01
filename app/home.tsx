import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/home.styles';
import { HomeActions } from '../components/homeActions';
import { HomeHeader } from '../components/homeHeader';
import { HomeStats } from '../components/homeStats';
import { useUserStats } from '../hooks/useUserStats';

export default function HomeScreen(): React.ReactElement {
  const router = useRouter();
  const { stats, loading } = useUserStats();

  if (loading || !stats) return <Text style={styles.loading}>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <HomeHeader
        avatarFile={stats.avatar ?? 'avataaars17.png'}
        frameFile={stats.frame ?? 'frame1.png'}
        nick={stats.nick}
        coins={stats.coins}
      />

      <HomeStats
        level={stats.level}
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
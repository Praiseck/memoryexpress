import { WortiseBanner } from '@wortise/react-native-sdk';
import React, { JSX } from 'react';
import {
  FlatList,
  Image,
  Text,
  View
} from 'react-native';
import { styles } from '../components/Styles/ranking.styles';
import { avatarRegistry } from '../hooks/avatarRegistry';
import { useRankingData } from '../hooks/useRankingData';
import { useUserStats } from '../hooks/useUserStats';

const RankingScreen: React.FC = (): JSX.Element => {
  const { stats } = useUserStats();
  const { ranking, loading } = useRankingData();

  if (loading || !ranking || !stats) {
    return <Text style={styles.loading}>Cargando ranking...</Text>;
  }

  const sortedRanking = [...ranking].sort(
    (a, b) => (b.bestStreak ?? 0) - (a.bestStreak ?? 0)
  );
  const userIndex = sortedRanking.findIndex((entry) => entry.uid === stats.uid);
  const userPosition = userIndex >= 0 ? userIndex + 1 : '—';
  const topRanking = sortedRanking.slice(0, 10);

  const getMedal = (index: number): string => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu posición</Text>
      <View style={[styles.rankingItem, userIndex < 10 && styles.highlight]}>
        <Text style={styles.position}>{userPosition}</Text>
        <Image
          source={avatarRegistry[stats.avatar ?? 'avataaars17.png']?.source}
          style={styles.avatar}
        />
        <Text style={styles.nick}>{stats.nick}</Text>
        <Text style={styles.streak}>🔥 {stats.bestStreak}</Text>
      </View>

      <Text style={styles.title}>Top 10 jugadores</Text>
      <FlatList
        data={topRanking}
        keyExtractor={(item) => item.uid}
        renderItem={({ item, index }) => {
          const avatarSource = avatarRegistry[item.avatar ?? 'avataaars17.png']?.source;
          const isUser = item.uid === stats.uid;
          return (
            <View style={[styles.rankingItem, isUser && styles.highlight]}>
              <Text style={styles.position}>{getMedal(index)}</Text>
              <Image source={avatarSource} style={styles.avatar} />
              <Text style={styles.nick}>{item.nick}</Text>
              <Text style={styles.streak}>🔥 {item.bestStreak}</Text>
            </View>
          );
        }}
      />

      {/* ✅ Banner de Wortise */}
      <View style={styles.banner}>
        <WortiseBanner adUnitId="5ed6529d-721f-4a57-ac97-2a91dc72b614" />
      </View>
    </View>
  );
};

export default RankingScreen;
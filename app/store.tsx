import { WortiseBanner } from '@wortise/react-native-sdk';
import React, { JSX, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HomeHeader } from '../components/homeHeader';
import { avatarRegistry } from '../hooks/avatarRegistry';
import { frameRegistry } from '../hooks/frameRegistry';
import { defaultAvatars, defaultFrames, useUserStats } from '../hooks/useUserStats';
import { useWortiseRewarded } from '../hooks/useWortiseRewarded';
import { styles } from '../screens/store.styles';

const avatarOptions = Object.keys(avatarRegistry);
const frameOptions = Object.entries(frameRegistry).map(([key, data]) => ({
  key,
  level: data.level,
}));

const dummyScale = new Animated.Value(1);

export default function StoreScreen(): JSX.Element {
  const { stats, updateStats } = useUserStats();
  const { showRewardedAd } = useWortiseRewarded();
  const videosWatched = stats?.videosWatchedToday ?? 0;

  const [showAll, setShowAll] = useState<boolean>(false);
  const [expandAvatars, setExpandAvatars] = useState<boolean>(false);
  const [expandFrames, setExpandFrames] = useState<boolean>(false);

  const handleBuy = (type: 'avatar' | 'frame', item: string, cost: number) => {
    if (!stats) return;

    const unlockedKey = type === 'avatar' ? 'unlockedAvatars' : 'unlockedFrames';
    const currentUnlocked: string[] = stats[unlockedKey] ?? [];

    if (currentUnlocked.includes(item)) {
      Alert.alert('Ya lo tienes', `Ya has desbloqueado este ${type}.`);
      return;
    }

    if ((stats.coins ?? 0) < cost) {
      Alert.alert('Monedas insuficientes', 'No tienes suficientes monedas.');
      return;
    }

    const updatedCoins = (stats.coins ?? 0) - cost;

    updateStats({
      coins: updatedCoins,
      [unlockedKey]: [...currentUnlocked, item],
    });

    Alert.alert('¡Compra exitosa!', `Has desbloqueado un nuevo ${type}.`);
  };

  if (!stats) return <Text style={styles.loading}>Cargando tienda...</Text>;

  const unlockedAvatars = stats.unlockedAvatars ?? defaultAvatars;
  const unlockedFrames = stats.unlockedFrames ?? defaultFrames;

  const filteredAvatars = showAll
    ? avatarOptions
    : avatarOptions.filter((a) => !unlockedAvatars.includes(a));

  const filteredFrames = showAll
    ? frameOptions
    : frameOptions.filter((f) => !unlockedFrames.includes(f.key));

  const visibleAvatars = expandAvatars ? filteredAvatars : filteredAvatars.slice(0, 6);
  const visibleFrames = expandFrames ? filteredFrames : filteredFrames.slice(0, 6);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <HomeHeader
          avatarFile={stats.avatar ?? 'avataaars17.png'}
          frameFile={stats.frame ?? 'frame1.png'}
          nick={stats.nick}
          coins={stats.coins ?? 0}
          coinsScale={dummyScale}
          compact
        />

        <View style={styles.rewardRow}>
          <TouchableOpacity style={styles.videoButton} onPress={showRewardedAd}>
            <Text style={styles.videoText}>Ver video</Text>
          </TouchableOpacity>
          <Text style={styles.videoCounter}>🎬 {videosWatched}/5</Text>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Mostrar todo</Text>
          <Switch value={showAll} onValueChange={setShowAll} />
        </View>

        <Text style={styles.sectionTitle}>🎭 Avatares</Text>
        <View style={styles.grid}>
          {visibleAvatars.map((avatar) => {
            const isUnlocked = unlockedAvatars.includes(avatar);
            return (
              <TouchableOpacity
                key={avatar}
                style={[styles.item, isUnlocked && styles.itemDisabled]}
                disabled={isUnlocked}
                onPress={() => handleBuy('avatar', avatar, avatarRegistry[avatar].price)}
              >
                <Image source={avatarRegistry[avatar].source} style={styles.image} />
                <Text style={isUnlocked ? styles.owned : styles.price}>
                  {isUnlocked ? '✅ Ya lo tienes' : `${avatarRegistry[avatar].price} 🪙`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {filteredAvatars.length > 6 && (
          <TouchableOpacity onPress={() => setExpandAvatars(!expandAvatars)}>
            <Text style={styles.expandText}>
              {expandAvatars ? 'Ver menos ▲' : 'Ver más ▼'}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>🖼️ Marcos</Text>
        <View style={styles.grid}>
          {visibleFrames.map(({ key, level }) => {
            const isUnlocked = unlockedFrames.includes(key);
            return (
              <TouchableOpacity
                key={key}
                style={[styles.item, isUnlocked && styles.itemDisabled]}
                disabled={isUnlocked}
                onPress={() => handleBuy('frame', key, frameRegistry[key].price)}
              >
                <Image source={frameRegistry[key].source} style={styles.image} />
                <View style={styles.levelTag}>
                  <Text style={styles.levelText}>Nivel {frameRegistry[key].level}</Text>
                </View>
                <Text style={isUnlocked ? styles.owned : styles.price}>
                  {isUnlocked ? '✅ Ya lo tienes' : `${frameRegistry[key].price} 🪙`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {filteredFrames.length > 6 && (
          <TouchableOpacity onPress={() => setExpandFrames(!expandFrames)}>
            <Text style={styles.expandText}>
              {expandFrames ? 'Ver menos ▲' : 'Ver más ▼'}
            </Text>
          </TouchableOpacity>
        )}

        {videosWatched === 4 && (
          <Text style={styles.bonusText}>
            ¡El próximo video te dará recompensa doble! 🎉
          </Text>
        )}
      </ScrollView>

      {/* ✅ Banner real de Wortise */}
      <View style={styles.adBanner}>
        <WortiseBanner adUnitId="TU_ID_DE_BANNER" />
      </View>
    </View>
  );
}
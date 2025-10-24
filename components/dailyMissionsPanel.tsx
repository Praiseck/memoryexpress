import { RNWortiseRewarded } from '@wortise/react-native-sdk';
import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Text, TouchableOpacity, View } from 'react-native';
import { useDailyMissions } from '../hooks/useDailyMissions';
import { useUserStats } from '../hooks/useUserStats';
import { styles } from './Styles/dailyMissionsPanel.styles';

export const DailyMissionsPanel: React.FC = () => {
  const { missions, claimMission, loading } = useDailyMissions();
  const { stats, updateStats } = useUserStats();

  const animRefs = useRef<Record<string, Animated.Value>>({});

  const getAnim = (key: string) => {
    if (!animRefs.current[key]) {
      animRefs.current[key] = new Animated.Value(1);
    }
    return animRefs.current[key];
  };

  const handleClaim = (key: string) => {
    const anim = getAnim(key);
    Animated.sequence([
      Animated.timing(anim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    claimMission(key as any);
  };

  useEffect(() => {
    RNWortiseRewarded.setAdUnitId('TU_ID_DE_REWARDED');
    RNWortiseRewarded.loadAd();

    RNWortiseRewarded.addEventListener('onRewardedCompleted', async () => {
      if (!stats?.uid) return;

      const updatedCount = (stats.videosWatchedToday ?? 0) + 1;
      await updateStats({ videosWatchedToday: updatedCount });

      Alert.alert('¡Gracias por ver el video!', 'Tu misión ha sido actualizada.');
      claimMission('video');
    });

    return () => {
      RNWortiseRewarded.removeAllListeners('onRewardedCompleted');
    };
  }, [stats?.uid]);

  const handleVideoMission = () => {
    if (RNWortiseRewarded.isAvailable) {
      RNWortiseRewarded.showAd();
    } else {
      Alert.alert('Espera un momento', 'El anuncio aún no está disponible.');
    }
  };

  if (loading) return <Text style={styles.loading}>Cargando misiones...</Text>;

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>🎯 Misiones diarias</Text>
      {missions.map((mission) => {
        const isReady = mission.conditionMet && !mission.claimed;
        const isClaimed = mission.claimed;
        const checkbox = isClaimed ? '✅' : mission.conditionMet ? '☑️' : '⬜';

        return (
          <Animated.View
            key={mission.key}
            style={[styles.missionBox, { transform: [{ scale: getAnim(mission.key) }] }]}
          >
            <Text style={styles.missionText}>
              {checkbox} {mission.label}
            </Text>
            <Text style={styles.rewardText}>Recompensa: +{mission.reward} 🪙</Text>

            {/* 🔁 Misión de video: mostrar botón especial si no está completada */}
            {mission.key === 'video' && !mission.conditionMet && !mission.claimed && (
              <TouchableOpacity style={styles.claimButton} onPress={handleVideoMission}>
                <Text style={styles.claimText}>Ver video</Text>
              </TouchableOpacity>
            )}

            {/* 🔁 Misión normal: botón de reclamar si está lista */}
            {isReady && mission.key !== 'video' && (
              <TouchableOpacity style={styles.claimButton} onPress={() => handleClaim(mission.key)}>
                <Text style={styles.claimText}>Reclamar</Text>
              </TouchableOpacity>
            )}

            {isClaimed && <Text style={styles.claimed}>Reclamada 🎉</Text>}
          </Animated.View>
        );
      })}
    </View>
  );
};
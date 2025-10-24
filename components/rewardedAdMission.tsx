import { useDailyMissions } from '@/hooks/useDailyMissions';
import { useUserStats } from '@/hooks/useUserStats';
import { RNWortiseRewarded } from '@wortise/react-native-sdk';
import React, { useEffect } from 'react';
import { Alert, Button } from 'react-native';

export const RewardedAdMission = () => {
  const { missions, claimMission } = useDailyMissions();
  const { stats, updateStats } = useUserStats();

  const videoMission = missions.find((m) => m.key === 'video');

  useEffect(() => {
    RNWortiseRewarded.setAdUnitId('TU_ID_DE_REWARDED');
    RNWortiseRewarded.loadAd();

    RNWortiseRewarded.addEventListener('onRewardedCompleted', async () => {
      if (!stats?.uid) return;

      const updatedCount = (stats.videosWatchedToday ?? 0) + 1;

      await updateStats({ videosWatchedToday: updatedCount });

      Alert.alert('¡Gracias por ver el video!', 'Tu misión ha sido actualizada.');

      // Reclamar recompensa si ya cumple la condición
      setTimeout(() => {
        claimMission('video');
      }, 500);
    });

    return () => {
      RNWortiseRewarded.removeAllListeners('onRewardedCompleted');
    };
  }, [stats?.uid]);

  const showAd = () => {
    if (RNWortiseRewarded.isAvailable) {
      RNWortiseRewarded.showAd();
    } else {
      Alert.alert('Espera un momento', 'El anuncio aún no está disponible.');
    }
  };

  if (!videoMission || videoMission.conditionMet) return null;

  return <Button title="Ver video y completar misión" onPress={showAd} />;
};
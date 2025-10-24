import { RNWortiseRewarded } from '@wortise/react-native-sdk';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { db } from '../firebase/config';
import { useUserStats } from './useUserStats';

export function useWortiseRewarded() {
  const { stats, updateStats } = useUserStats();
  const videosWatched = stats?.videosWatchedToday ?? 0;

  useEffect(() => {
    RNWortiseRewarded.setAdUnitId('TU_ID_DE_REWARDED');
    RNWortiseRewarded.loadAd();

    RNWortiseRewarded.addEventListener('onRewardedCompleted', async () => {
      if (!stats?.uid) return;

      const reward = videosWatched === 4 ? 20 : 5;
      const newTotal = (stats.coins ?? 0) + reward;
      const newVideoCount = (videosWatched + 1) % 5;

      try {
        await updateDoc(doc(db, 'users', stats.uid), {
          coins: newTotal,
          videosWatchedToday: newVideoCount,
        });

        Alert.alert('¡Gracias por ver!', `Has ganado ${reward} 🪙 por ver el video.`);
      } catch (error) {
        console.error('[WORTISE] Error al actualizar Firestore:', error);
      }
    });

    return () => {
      RNWortiseRewarded.removeAllListeners('onRewardedCompleted');
    };
  }, [stats?.uid]);

  const showRewardedAd = () => {
    if (!RNWortiseRewarded.isAvailable) {
      Alert.alert('Espera un momento', 'El video aún no está disponible.');
      return;
    }

    RNWortiseRewarded.showAd();
  };

  return { showRewardedAd };
}
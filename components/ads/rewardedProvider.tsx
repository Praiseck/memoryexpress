import { RNWortiseRewarded } from '@wortise/react-native-sdk';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Alert, Button } from 'react-native';
import { db } from '../../firebase/config'; // Ajusta según tu estructura
import { REWARDED_IDS } from './config';

export const RewardedProvider = () => {
  const user = getAuth().currentUser;

  useEffect(() => {
    RNWortiseRewarded.setAdUnitId(REWARDED_IDS.wortise);
    RNWortiseRewarded.loadAd();

    RNWortiseRewarded.addEventListener('onRewardedCompleted', async () => {
      if (!user) return;

      try {
        const ref = doc(db, 'stats', user.uid);
        await updateDoc(ref, {
          'misiones.recompensada': true,
          'misiones.recompensaPendiente': false,
          'misiones.ultimaRecompensa': new Date().toISOString(),
        });

        Alert.alert('¡Recompensa recibida!', 'Tu progreso ha sido actualizado.');
      } catch (error) {
        console.error('Error al actualizar Firestore:', error);
        Alert.alert('Error', 'No se pudo registrar la recompensa.');
      }
    });

    return () => {
      RNWortiseRewarded.removeAllListeners('onRewardedCompleted');
    };
  }, []);

  const showAd = () => {
    if (RNWortiseRewarded.isAvailable) {
      RNWortiseRewarded.showAd();
    } else {
      Alert.alert('Espera un momento', 'El anuncio aún no está disponible.');
    }
  };

  return <Button title="Ver anuncio y ganar recompensa" onPress={showAd} />;
};
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { JSX } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { frameMap } from '../hooks/frameRegistry';
import { styles } from '../screens/levelUp.styles';


export default function LevelUpScreen(): JSX.Element {
  const navigation = useNavigation();
  const { level, rewardFrame } = useLocalSearchParams();

  const handleContinue = () => {
    navigation.goBack(); // o router.replace('/home') si prefieres redirigir
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 ¡Subiste al nivel {level}!</Text>

      <Text style={styles.subtitle}>Has desbloqueado un nuevo marco:</Text>
      {typeof rewardFrame === 'string' && frameMap[rewardFrame] ? (
        <Image source={frameMap[rewardFrame]} style={styles.frame} />
      ) : (
        <Text style={styles.noReward}>Este nivel no tiene recompensa visual</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

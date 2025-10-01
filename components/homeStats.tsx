import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './homeStats.styles';

interface Props {
  level: number;
  streak: number;
  totalEarned: number;
}

export const HomeStats: React.FC<Props> = ({ level, streak, totalEarned }) => (
  <View style={styles.stats}>
    <Text style={styles.label}>Nivel: {level}</Text>
    <Text style={styles.label}>Racha: {streak}</Text>
    <Text style={styles.label}>Total ganado: {totalEarned} 🪙</Text>
  </View>
);
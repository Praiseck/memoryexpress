import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles/homeStats.styles';

interface Props {
  profileLevel: number;
  streak: number;
  totalEarned: number;
}

export const HomeStats: React.FC<Props> = ({
  profileLevel,
  streak,
  totalEarned,
}): JSX.Element => {
  return (
    <View style={styles.stats}>
      <Text style={styles.label}>Nivel de perfil: {profileLevel}</Text>
      <Text style={styles.label}>Racha actual: {streak}</Text>
      <Text style={styles.label}>Total ganado: {totalEarned} 🪙</Text>
    </View>
  );
};
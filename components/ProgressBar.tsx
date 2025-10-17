import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles/ProgressBar.styles';

interface ProgressBarProps {
  level: number;
  streak: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  level,
  streak,
}): JSX.Element => {
  const progressToNextLevel = Math.min(streak % 5, 5);
  const progressPercent = Math.round((progressToNextLevel / 5) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.level}>Nivel {level}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.streak}>Racha: {streak}</Text>
    </View>
  );
};
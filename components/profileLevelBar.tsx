import React from 'react';
import { Text, View } from 'react-native';
import { useProfileLevel } from '../hooks/useProfileLevel';
import { styles } from './profileLevelBar.styles';

interface Props {
  xp: number;
}

export const ProfileLevelBar: React.FC<Props> = ({ xp }) => {
  const { level, currentXP, xpForNextLevel, progressPercent } = useProfileLevel(xp);

  return (
    <View style={styles.container}>
      <Text style={styles.level}>Nivel {level}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.xp}>{currentXP} / {xpForNextLevel} XP</Text>
    </View>
  );
};
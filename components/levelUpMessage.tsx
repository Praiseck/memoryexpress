import React, { JSX, useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { styles } from './Styles/levelUpMessage.styles';

interface LevelUpMessageProps {
  level: number;
}

export function LevelUpMessage({ level }: LevelUpMessageProps): JSX.Element {
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.delay(2500),
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>¡Nivel {level} alcanzado! 🎉</Text>
    </Animated.View>
  );
}
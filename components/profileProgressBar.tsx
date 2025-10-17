import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { JSX } from 'react/jsx-runtime';
import { styles } from './Styles/profileProgressBar.styles';

interface ProfileProgressBarProps {
  level: number;
  progressPercent: number;
}

export function ProfileProgressBar({
  level,
  progressPercent,
}: ProfileProgressBarProps): JSX.Element {
  const animatedWidth = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progressPercent,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progressPercent]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nivel {level}</Text>
      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <Text style={styles.percent}>{Math.floor(progressPercent)}%</Text>
    </View>
  );
}
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface Props {
  duration: number; // en segundos
}

export const TimerBar: React.FC<Props> = ({ duration }) => {
  const widthAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    widthAnim.setValue(100);
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();
  }, [duration]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: widthAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }) }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '80%',
    backgroundColor: '#555',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

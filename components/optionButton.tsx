import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles/optionsDisplay.styles';

interface OptionButtonProps {
  emoji: string;
  isSelected: boolean;
  isCorrect: boolean | null;
  onSelect: () => void;
  disabled: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  emoji,
  isSelected,
  isCorrect,
  onSelect,
  disabled,
}) => {
  const shineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelected && isCorrect === true) {
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(shineAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isSelected, isCorrect]);

  const feedbackStyle =
    isSelected && isCorrect === true
      ? styles.correct
      : isSelected && isCorrect === false
      ? styles.incorrect
      : null;

  const animatedStyle = {
    shadowColor: '#FFD700',
    shadowOpacity: shineAnim,
    shadowRadius: shineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 12],
    }),
    shadowOffset: { width: 0, height: 0 },
    elevation: shineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    }),
  };

  return (
    <Animated.View style={[styles.option, feedbackStyle, animatedStyle]}>
      <TouchableOpacity onPress={onSelect} disabled={disabled}>
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
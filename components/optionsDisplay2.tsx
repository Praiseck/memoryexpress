import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { OptionButton } from './optionButton';
import { styles } from './Styles/optionsDisplay.styles';

interface OptionsDisplayProps {
  options: string[];
  onSelect: (emoji: string) => void;
  showQuestion: boolean;
  selectedEmoji: string | null;
  isCorrect: boolean | null;
}

export const OptionsDisplay: React.FC<OptionsDisplayProps> = ({
  options,
  onSelect,
  showQuestion,
  selectedEmoji,
  isCorrect,
}): JSX.Element | null => {
  if (!showQuestion) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuál faltaba?</Text>
      <View style={styles.row}>
        {options.map((emoji, idx) => (
          <OptionButton
            key={idx}
            emoji={emoji}
            isSelected={selectedEmoji === emoji}
            isCorrect={isCorrect}
            onSelect={() => onSelect(emoji)}
            disabled={selectedEmoji !== null}
          />
        ))}
      </View>
    </View>
  );
};
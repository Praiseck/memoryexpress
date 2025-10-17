import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { styles } from './Styles/SequenceDisplay.styles';

interface SequenceDisplayProps {
  sequence: string[];
  timeLeft: number;
  showQuestion: boolean;
  missingEmoji: string;
}

export const SequenceDisplay: React.FC<SequenceDisplayProps> = ({
  sequence,
  timeLeft,
  showQuestion,
  missingEmoji,
}): JSX.Element => {
  const displaySequence = showQuestion
    ? sequence.map((e) => (e === missingEmoji ? '❓' : e))
    : sequence;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {showQuestion ? '¿Cuál falta?' : 'Memoriza la secuencia'}
      </Text>
      <View style={styles.row}>
        {displaySequence.map((emoji, idx) => (
          <Text key={idx} style={styles.emoji}>
            {emoji}
          </Text>
        ))}
      </View>
      {!showQuestion && (
        <Text style={styles.timer}>Tiempo: {timeLeft}s</Text>
      )}
    </View>
  );
};
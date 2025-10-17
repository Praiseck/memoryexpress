import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Styles/dailyRewardModal.styles';

interface Props {
  visible: boolean;
  onClaim: () => void;
  onClose: () => void;
  streak: number;
}

export const DailyRewardModal: React.FC<Props> = ({ visible, onClaim, onClose, streak }) => {
  const reward = streak >= 5 ? 20 : 5;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>🎉 ¡Recompensa diaria!</Text>
          <Text style={styles.text}>Racha actual: {streak} días</Text>
          <Text style={styles.text}>Has ganado {reward} 🪙</Text>
          <TouchableOpacity onPress={onClaim}>
            <Text style={styles.button}>Reclamar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.skip}>Omitir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
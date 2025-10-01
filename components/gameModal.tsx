import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './gameModal.styles';

interface Props {
  showRewardModal: boolean;
  hasFailed: boolean;
  showEndMenu: boolean;
  showEndOptions: boolean;
  earnedThisRound: number;
  onContinueAd: () => void;
  onEndGame: () => void;
  onDoubleRewardAd: () => void;
  onFinishWithoutAd: () => void;
  onRestart: () => void;
  onGoHome: () => void;
}

export const GameModal: React.FC<Props> = ({
  showRewardModal,
  hasFailed,
  showEndMenu,
  showEndOptions,
  earnedThisRound,
  onContinueAd,
  onEndGame,
  onDoubleRewardAd,
  onFinishWithoutAd,
  onRestart,
  onGoHome,
}) => {
  if (showRewardModal && hasFailed && !showEndMenu) {
    return (
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>¡Fallaste! ¿Quieres continuar?</Text>
          <TouchableOpacity onPress={onContinueAd}>
            <Text style={styles.modalButton}>Ver video y continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEndGame}>
            <Text style={styles.modalButton}>Terminar partida</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showEndMenu) {
    return (
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {!showEndOptions ? (
            <>
              <Text style={styles.modalText}>Has ganado {earnedThisRound} 🪙</Text>
              <Text style={styles.modalText}>¿Quieres duplicarlas?</Text>
              <TouchableOpacity onPress={onDoubleRewardAd}>
                <Text style={styles.modalButton}>Ver video y duplicar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onFinishWithoutAd}>
                <Text style={styles.modalButton}>Aceptar sin duplicar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalText}>¿Qué quieres hacer ahora?</Text>
              <View style={styles.endButtons}>
                <TouchableOpacity onPress={onRestart}>
                  <Text style={styles.endButton}>Volver a jugar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onGoHome}>
                  <Text style={styles.endButton}>Ir al menú principal</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }

  return null;
};
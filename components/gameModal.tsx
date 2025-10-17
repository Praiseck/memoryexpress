import React, { JSX, useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './Styles/gameModal.styles';

interface GameSummary {
  xp: number;
  coins: number;
  streak: number;
  bestStreak: number;
  doubleReward: boolean;
}

interface Props {
  showRewardModal: boolean;
  hasFailed: boolean;
  showEndMenu: boolean;
  showEndOptions: boolean;
  earnedThisRound: number;
  gameSummary: GameSummary | null;
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
  gameSummary,
  onContinueAd,
  onEndGame,
  onDoubleRewardAd,
  onFinishWithoutAd,
  onRestart,
  onGoHome,
}): JSX.Element | null => {
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    if (showEndMenu && !showEndOptions) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [showEndMenu, showEndOptions]);

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

  if (showEndMenu && !showEndOptions) {
    return (
      <Modal visible={showEndMenu} transparent animationType="fade">
        <View style={styles.overlay}>
          <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
            <Text style={styles.modalText}>
              Has ganado {earnedThisRound} 🪙
            </Text>
            <Text style={styles.modalText}>¿Quieres duplicarlas?</Text>
            <TouchableOpacity onPress={onDoubleRewardAd}>
              <Text style={styles.modalButton}>Ver video y duplicar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFinishWithoutAd}>
              <Text style={styles.modalButton}>Aceptar sin duplicar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  if (showEndMenu && showEndOptions) {
    return (
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>🏁 Resumen de la partida</Text>
          {gameSummary && (
            <>
              <Text style={styles.modalText}>🧠 XP ganado: {gameSummary.xp}</Text>
              <Text style={styles.modalText}>🪙 Monedas obtenidas: {gameSummary.coins}</Text>
              <Text style={styles.modalText}>🔥 Racha alcanzada: {gameSummary.streak}</Text>
              <Text style={styles.modalText}>
                🏅 {gameSummary.streak >= gameSummary.bestStreak
                  ? '¡Nuevo récord de racha!'
                  : `Mejor racha: ${gameSummary.bestStreak}`}
              </Text>
              <Text style={styles.modalText}>
                🎬 Recompensa duplicada: {gameSummary.doubleReward ? 'Sí' : 'No'}
              </Text>
            </>
          )}
          <Text style={styles.modalText}>¿Qué quieres hacer ahora?</Text>
          <View style={styles.endButtons}>
            <TouchableOpacity onPress={onRestart}>
              <Text style={styles.endButton}>Volver a jugar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoHome}>
              <Text style={styles.endButton}>Ir al menú principal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return null;
};
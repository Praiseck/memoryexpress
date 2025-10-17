import { router } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { JSX, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { db } from '../firebase/config';
import { avatarRegistry } from '../hooks/avatarRegistry';
import { frameRegistry } from '../hooks/frameRegistry';
import { defaultAvatars, defaultFrames, useUserStats } from '../hooks/useUserStats';
import { styles } from '../screens/perfil.styles';

async function isNicknameAvailable(nick: string, currentUid: string): Promise<boolean> {
  const q = query(collection(db, 'users'), where('nick', '==', nick));
  const snapshot = await getDocs(q);
  return snapshot.empty || snapshot.docs[0].id === currentUid;
}

const PerfilScreen: React.FC = (): JSX.Element => {
  const { stats, updateStats, reloadStats } = useUserStats();

  const [selectedAvatar, setSelectedAvatar] = useState<string>(stats?.avatar ?? 'avataaars17.png');
  const [selectedFrame, setSelectedFrame] = useState<string>(stats?.frame ?? 'frame1.png');
  const [nick, setNick] = useState<string>(stats?.nick ?? 'Jugador123');

  const [nickAvailable, setNickAvailable] = useState<boolean | null>(null);
  const [checkingNick, setCheckingNick] = useState<boolean>(false);

  const unlockedAvatars = stats?.unlockedAvatars ?? defaultAvatars;
  const unlockedFrames = stats?.unlockedFrames ?? defaultFrames;

  useEffect(() => {
    if (stats) {
      setSelectedAvatar(stats.avatar ?? 'avataaars17.png');
      setSelectedFrame(stats.frame ?? 'frame1.png');
      setNick(stats.nick ?? 'Jugador123');
    }
  }, [stats]);

  useEffect(() => {
    const check = async () => {
      const trimmed = nick.trim();
      if (!trimmed || trimmed === stats?.nick) {
        setNickAvailable(null);
        return;
      }
      setCheckingNick(true);
      const available = await isNicknameAvailable(trimmed, stats?.uid ?? '');
      setNickAvailable(available);
      setCheckingNick(false);
    };
    const delay = setTimeout(check, 500);
    return () => clearTimeout(delay);
  }, [nick]);

  const handleSave = async (): Promise<void> => {
    if (!stats?.uid) return;

    const trimmedNick = nick.trim();
    if (!trimmedNick) {
      Alert.alert('Campo requerido', 'El nickname no puede estar vacío.');
      return;
    }

    if (trimmedNick !== stats.nick && nickAvailable === false) {
      Alert.alert('Nickname en uso', 'Ese nickname ya está ocupado. Elige otro.');
      return;
    }

    try {
      await updateStats({
        avatar: selectedAvatar,
        frame: selectedFrame,
        nick: trimmedNick,
      });
      await reloadStats();
      router.replace('/home');
    } catch (error: unknown) {
      console.error('[PERFIL] Error al guardar:', error);
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    }
  };

  const avatarSize = selectedFrame === 'frame_fire' ? 85 : 90;

  const avatarSource =
    avatarRegistry[selectedAvatar]?.source ??
    avatarRegistry['avataaars17.png']?.source ??
    null;

  const frameSource =
    frameRegistry[selectedFrame]?.source ??
    frameRegistry['frame1.png']?.source ??
    null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personaliza tu perfil</Text>

      <View style={styles.preview}>
        {frameSource && <Image source={frameSource} style={styles.frame} />}
        {avatarSource && (
          <Image
            source={avatarSource}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              position: 'absolute',
              zIndex: 1,
            }}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        value={nick}
        onChangeText={setNick}
        placeholder="Tu nick"
        placeholderTextColor="#888"
      />

      <Text style={styles.nickStatus}>
        {checkingNick
          ? '⏳ Verificando...'
          : nick.trim() === stats?.nick
            ? ''
            : nick.trim() === ''
              ? '⚪ Escribe un nick...'
              : nickAvailable
                ? '🟢 Disponible'
                : '🔴 Ya está en uso'}
      </Text>

      <Text style={styles.section}>Selecciona tu avatar</Text>
      <View style={styles.options}>
        {unlockedAvatars.map((avatar) => {
          const source = avatarRegistry[avatar]?.source;
          if (!source) return null;
          return (
            <TouchableOpacity key={avatar} onPress={() => setSelectedAvatar(avatar)}>
              <Image
                source={source}
                style={[
                  styles.optionImage,
                  selectedAvatar === avatar && styles.selected,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.section}>Selecciona tu marco</Text>
      <View style={styles.options}>
        {unlockedFrames.map((frame) => {
          const source = frameRegistry[frame]?.source;
          if (!source) return null;
          return (
            <TouchableOpacity key={frame} onPress={() => setSelectedFrame(frame)}>
              <Image
                source={source}
                style={[
                  styles.optionImage,
                  selectedFrame === frame && styles.selected,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PerfilScreen;
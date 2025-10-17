import { router } from 'expo-router';
import {
  getAuth,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React, { JSX, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../components/Styles/nickname.styles';
import { firebaseApp } from '../firebase/config';
import { avatarMap } from '../hooks/avatarRegistry';
import { frameMap } from '../hooks/frameRegistry';

const NicknameScreen: React.FC = (): JSX.Element => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [nick, setNick] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const generateRandomNick = (): string => {
    const adjectives = ['Rápido', 'Brillante', 'Silencioso', 'Valiente'];
    const animals = ['Jaguar', 'Cóndor', 'Tigre', 'Mono'];
    const number = Math.floor(Math.random() * 1000);
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}${number}`;
  };

  const checkNickAvailability = async (nickToCheck: string): Promise<void> => {
    if (!nickToCheck) {
      setAvailable(false);
      return;
    }
    setChecking(true);
    const q = query(collection(db, 'users'), where('nick', '==', nickToCheck));
    const snapshot = await getDocs(q);
    setAvailable(snapshot.empty);
    setChecking(false);
  };

  useEffect(() => {
    const delayCheck = setTimeout(() => {
      checkNickAvailability(nick.trim());
    }, 500);
    return () => clearTimeout(delayCheck);
  }, [nick]);

  const generateUniqueNick = async (): Promise<string> => {
    for (let i = 0; i < 5; i++) {
      const candidate = generateRandomNick();
      const q = query(collection(db, 'users'), where('nick', '==', candidate));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return candidate;
    }
    throw new Error('No se pudo generar un nick único después de varios intentos.');
  };

  const handleSubmit = async (): Promise<void> => {
    const user: User | null = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No se encontró el usuario autenticado.');
      return;
    }

    setLoading(true);

    try {
      const finalNick = nick.trim()
        ? nick.trim()
        : await generateUniqueNick(); // ✅ usa nick único si no se escribe

      const q = query(collection(db, 'users'), where('nick', '==', finalNick));
      const snapshot = await getDocs(q);
      if (!snapshot.empty && nick.trim()) {
        Alert.alert('Nick en uso', 'Por favor elige otro o genera uno nuevo.');
        setLoading(false);
        return;
      }

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email ?? '',
        nick: finalNick,
        avatar: user.photoURL ?? Object.keys(avatarMap)[0],
        frame: Object.keys(frameMap)[0],
        coins: 10,
        level: 1,
        bestStreak: 0,
      });

      router.replace('/home');
    } catch (error: unknown) {
      const err = error as { message?: string };
      Alert.alert('Error', err.message ?? 'No se pudo guardar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu nombre de usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu nick"
        placeholderTextColor="#aaa"
        value={nick}
        onChangeText={setNick}
        autoCapitalize="none"
      />

      {checking ? (
        <ActivityIndicator color="#fff" />
      ) : nick.trim() ? (
        <Text style={{ color: available ? 'green' : 'red' }}>
          {available ? 'Disponible ✅' : 'Ya está en uso ❌'}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {nick.trim() ? 'Continuar' : 'Usar nick aleatorio'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NicknameScreen;
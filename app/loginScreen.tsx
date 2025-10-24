import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React, { JSX, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../firebase/config';
import { styles } from '../screens/login.styles';

const adjectives = ['Rápido', 'Brillante', 'Suave', 'Feliz', 'Ágil', 'Luz', 'Mono', 'Tigre'];
const nouns = ['Sol', 'Estrella', 'Mono', 'Gato', 'Perla', 'Rayo', 'Nube', 'Fuego'];

async function generateUniqueNickname(): Promise<string> {
  for (let i = 0; i < 10; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 100);
    const nickname = `${adj}${noun}${number}`;

    const q = query(collection(db, 'users'), where('nick', '==', nickname));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return nickname;
  }
  throw new Error('No se pudo generar un nickname único.');
}

const LoginScreen: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        router.replace('/homeScreen');
      } else {
        const nickname = await generateUniqueNickname();

        await setDoc(ref, {
          uid: user.uid,
          email: user.email ?? '',
          nick: nickname,
          avatar: 'avataaars17.png',
          frame: 'free.png',
          coins: 50,
          level: 1,
          bestStreak: 0,
          streak: 0,
          totalEarned: 0,
          xp: 1,
          profileLevel: 1,
          unlockedAvatars: ['avataaars17.png', 'avataaars0.png', 'avataaars1.png'],
          unlockedFrames: ['free.png', 'lvl2'],
          createdAt: new Date(),
        });

        await updateProfile(user, { displayName: nickname });
        router.replace('/homeScreen');
      }
    });

    return unsub;
  }, []);

  const handleEmailLogin = async (): Promise<void> => {
    if (!email.trim() || !password) {
      Alert.alert('Campos requeridos', 'Ingresa correo y contraseña.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: unknown) {
      const error = e as { code?: string; message?: string };
      if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Usuario no encontrado',
          'No existe una cuenta con este correo. ¿Quieres registrarte con estos datos?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Registrarme',
              onPress: async () => {
                try {
                  const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
                  // El resto lo maneja onAuthStateChanged
                } catch (err: unknown) {
                  const regError = err as { message?: string };
                  Alert.alert('Error', regError.message ?? 'No se pudo registrar.');
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', error.message ?? 'No se pudo iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      // El resto lo maneja onAuthStateChanged
    } catch (e: unknown) {
      const error = e as { message?: string };
      Alert.alert('Error', error.message ?? 'No se pudo iniciar sesión anónimamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/BG-memory.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/images/Name-memory.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          placeholder="Correo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007AFF' }]}
          onPress={handleEmailLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar con correo</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#888' }]}
          onPress={handleAnonymousLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continuar sin registrarse</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
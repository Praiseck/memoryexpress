import { router } from 'expo-router';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebaseApp } from '../firebase/config';

export default function LoginScreen() {
  useEffect(() => {
    console.log('[LOGIN] Componente montado');
  }, []);

  const handleAnonymousLogin = async () => {
    console.log('[LOGIN] Intentando login anónimo...');
    try {
      const auth = getAuth(firebaseApp);
      await signInAnonymously(auth);
      console.log('[LOGIN] Login exitoso. Redirigiendo a /home');
      router.replace('/home');
    } catch (error: any) {
      console.log('[LOGIN] Error en login:', error.message);
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a MemoryExpress</Text>
      <TouchableOpacity style={styles.button} onPress={handleAnonymousLogin}>
        <Text style={styles.buttonText}>Iniciar sesión anónima</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
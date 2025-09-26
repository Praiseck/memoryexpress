// app/login.tsx
import { router } from 'expo-router';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebaseApp } from '../firebase/config'; // asegúrate de tener este archivo

export default function LoginScreen() {
  const handleAnonymousLogin = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signInAnonymously(auth);
      router.replace('/home'); // redirige a la pantalla principal
    } catch (error: any) {
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
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase/config';
import { styles } from './Styles/homeActions.styles';

export const HomeActions: React.FC = (): JSX.Element => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error: unknown) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/store')}>
        <Text style={styles.text}>🛍️ Tienda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ranking')}>
        <Text style={styles.text}>📊 Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/missions')} style={styles.button}>
        <Text style={styles.text}>📆 Misiones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>🔒 Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};
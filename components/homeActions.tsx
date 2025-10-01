import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './homeActions.styles';

export const HomeActions = () => {
  const router = useRouter();

  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/store')}>
        <Text style={styles.text}>🛍️ Tienda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ranking')}>
        <Text style={styles.text}>📊 Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Volumen')}>
        <Text style={styles.text}>🔊 Volumen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/login')}>
        <Text style={styles.text}>🔒 Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};
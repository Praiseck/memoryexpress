import { router } from 'expo-router';
import React, { JSX, useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const SplashScreen: React.FC = (): JSX.Element => {
  useEffect(() => {
    console.log('[SPLASH] Montado. Esperando 3 segundos...');
    const timer = setTimeout(() => {
      console.log('[SPLASH] Redirigiendo a /login');
      router.replace('/login');
    }, 3000);

    return () => {
      console.log('[SPLASH] Desmontado');
      clearTimeout(timer);
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/BG-splash.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
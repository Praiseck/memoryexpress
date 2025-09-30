// app/home.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebaseApp } from '../firebase/config';

// Mapa estático de avatares
const avatarMap: { [key: string]: any } = {
  'avataaars0.png': require('../assets/images/avatars/avataaars0.png'),
  'avataaars1.png': require('../assets/images/avatars/avataaars1.png'),
  'avataaars2.png': require('../assets/images/avatars/avataaars2.png'),
  'avataaars3.png': require('../assets/images/avatars/avataaars3.png'),
  'avataaars4.png': require('../assets/images/avatars/avataaars4.png'),
  'avataaars5.png': require('../assets/images/avatars/avataaars5.png'),
  'avataaars6.png': require('../assets/images/avatars/avataaars6.png'),
  'avataaars7.png': require('../assets/images/avatars/avataaars7.png'),
  'avataaars8.png': require('../assets/images/avatars/avataaars8.png'),
  'avataaars9.png': require('../assets/images/avatars/avataaars9.png'),
  'avataaars10.png': require('../assets/images/avatars/avataaars10.png'),
  'avataaars11.png': require('../assets/images/avatars/avataaars11.png'),
  'avataaars12.png': require('../assets/images/avatars/avataaars12.png'),
  'avataaars13.png': require('../assets/images/avatars/avataaars13.png'),
  'avataaars14.png': require('../assets/images/avatars/avataaars14.png'),
  'avataaars15.png': require('../assets/images/avatars/avataaars15.png'),
  'avataaars16.png': require('../assets/images/avatars/avataaars16.png'),
  'avataaars17.png': require('../assets/images/avatars/avataaars17.png'),
  'avataaars18.png': require('../assets/images/avatars/avataaars18.png'),
  'avataaars19.png': require('../assets/images/avatars/avataaars19.png'),
};

// Mapa estático de marcos
const frameMap: { [key: string]: any } = {
  'frame0.png': require('../assets/images/frames/frame0.png'),
  'frame1.png': require('../assets/images/frames/frame1.png'),
  'frame2.png': require('../assets/images/frames/frame2.png'),
  'frame3.png': require('../assets/images/frames/10951724.png'),
};

export default function HomeScreen() {
  const params = useLocalSearchParams();

  const avatarParam = Array.isArray(params.avatar) ? params.avatar[0] : params.avatar;
  const frameParam = Array.isArray(params.frame) ? params.frame[0] : params.frame;
  const nickParam = Array.isArray(params.nick) ? params.nick[0] : params.nick;

  const avatarFile = avatarParam ?? 'avataaars17.png';
  const frameFile = frameParam ?? 'frame1.png';
  const userNick = nickParam ?? 'Jugador123';
  const userCoins = 250;

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      router.replace('/login');
    } catch (error: any) {
      console.log('[HOME] Error al cerrar sesión:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado superior */}
      <View style={styles.header}>
        {/* Avatar + Nick */}
        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <View style={styles.avatarContainer}>
            <View style={styles.preview}>
              <Image source={frameMap[frameFile]} style={styles.frame} />
              <Image source={avatarMap[avatarFile]} style={styles.avatar} />
            </View>
            <Text style={styles.nick}>{userNick}</Text>
          </View>
        </TouchableOpacity>

        {/* Nombre del componente */}
        <Text style={styles.location}>Home</Text>

        {/* Monedas + Volumen */}
        <View style={styles.coinsBlock}>
          <Text style={styles.coins}>{userCoins} 🪙</Text>
          <TouchableOpacity style={styles.volumeButton}>
            <Text style={styles.volumeIcon}>🔊</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/game')}>
          <Text style={styles.buttonText}>JUGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/ranking')}>
          <Text style={styles.buttonText}>RANKING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/store')}>
          <Text style={styles.buttonText}>TIENDA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Franja negra simulando AdMob */}
      <View style={styles.adPlaceholder}>
        <Text style={styles.adText}>Espacio reservado para AdMob</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  preview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  frame: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 2,
  },
  nick: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  location: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  coinsBlock: {
    alignItems: 'flex-end',
    gap: 10,
  },
  coins: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  volumeButton: {
    marginTop: 10,
  },
  volumeIcon: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  mainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 40,
  },
  logoutText: {
    color: '#f44336',
    fontSize: 14,
  },
  adPlaceholder: {
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    color: '#888',
    fontSize: 12,
  },
});
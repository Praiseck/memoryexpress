// app/perfil.tsx
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Mapa estático de avatares
const avatarMap = {
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
const frameMap = {
  'frame0.png': require('../assets/images/frames/frame0.png'),
  'frame1.png': require('../assets/images/frames/frame1.png'),
  'frame2.png': require('../assets/images/frames/frame2.png'),
  'frame3.png': require('../assets/images/frames/10951724.png'),
};

const avatarOptions = Object.keys(avatarMap);
const frameOptions = Object.keys(frameMap);

export default function PerfilScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState('avataaars17.png');
  const [selectedFrame, setSelectedFrame] = useState('10951724.png');
  const [nick, setNick] = useState('Jugador123');

  const handleSave = () => {
    router.replace({
      pathname: '/home',
      params: {
        avatar: selectedAvatar,
        frame: selectedFrame,
        nick: nick,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personaliza tu perfil</Text>

      {/* Vista previa */}
      <View style={styles.preview}>
        <Image source={frameMap[selectedFrame]} style={styles.frame} />
        <Image source={avatarMap[selectedAvatar]} style={styles.avatar} />
      </View>

      {/* Nick */}
      <TextInput
        style={styles.input}
        value={nick}
        onChangeText={setNick}
        placeholder="Tu nick"
        placeholderTextColor="#888"
      />

      {/* Avatares */}
      <Text style={styles.section}>Selecciona tu avatar</Text>
      <View style={styles.options}>
        {avatarOptions.map((avatar, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedAvatar(avatar)}>
            <Image
              source={avatarMap[avatar]}
              style={[
                styles.optionImage,
                selectedAvatar === avatar && styles.selected,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Marcos */}
      <Text style={styles.section}>Selecciona tu marco</Text>
      <View style={styles.options}>
        {frameOptions.map((frame, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedFrame(frame)}>
            <Image
              source={frameMap[frame]}
              style={[
                styles.optionImage,
                selectedFrame === frame && styles.selected,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar y volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  preview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 1,
  },
  frame: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 2,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
  },
  section: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selected: {
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
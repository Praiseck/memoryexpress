import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './gameHeader.styles'; // estilos separados

interface Props {
  avatarFile: string;
  frameFile: string;
  nick: string;
  coins: number;
}

const avatarMap: Record<string, any> = {
  'avataaars17.png': require('../assets/images/avatars/avataaars17.png'),
};

const frameMap: Record<string, any> = {
  'frame1.png': require('../assets/images/frames/frame1.png'),
};

export const GameHeader: React.FC<Props> = ({ avatarFile, frameFile, nick, coins }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <View style={styles.preview}>
        <Image source={frameMap[frameFile]} style={styles.frame} />
        <Image source={avatarMap[avatarFile]} style={styles.avatar} />
      </View>
      <Text style={styles.nick}>{nick}</Text>
      <Text style={styles.coins}>{coins} 🪙</Text>
    </View>
  );
};
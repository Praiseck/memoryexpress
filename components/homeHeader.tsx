import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './homeHeader.styles';

const avatarMap: { [key: string]: any } = {
  'avataaars17.png': require('../assets/images/avatars/avataaars17.png'),
};

const frameMap: { [key: string]: any } = {
  'frame1.png': require('../assets/images/frames/frame1.png'),
};

interface Props {
  avatarFile: string;
  frameFile: string;
  nick: string;
  coins: number;
}

export const HomeHeader: React.FC<Props> = ({ avatarFile, frameFile, nick, coins }) => {
  const avatarSource = avatarMap[avatarFile] ?? avatarMap['avataaars17.png'];
  const frameSource = frameMap[frameFile] ?? frameMap['frame1.png'];

  return (
    <View style={styles.header}>
      <View style={styles.preview}>
        <Image source={frameSource} style={styles.frame} />
        <Image source={avatarSource} style={styles.avatar} />
      </View>
      <Text style={styles.nick}>{nick}</Text>
      <Text style={styles.coins}>{coins} 🪙</Text>
    </View>
  );
};
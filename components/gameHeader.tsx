import React, { JSX } from 'react';
import { Image, Text, View } from 'react-native';
import { avatarRegistry } from '../hooks/avatarRegistry';
import { frameRegistry } from '../hooks/frameRegistry';
import { styles } from './Styles/gameHeader.styles';

interface GameHeaderProps {
  avatarFile: string;
  frameFile: string;
  nick: string;
  level: number;
  coins: number;
}

export function GameHeader({
  avatarFile,
  frameFile,
  nick,
  level,
  coins,
}: GameHeaderProps): JSX.Element {
  const fallbackAvatar = 'avataaars17.png';
  const fallbackFrame = 'free.png';

  const avatarSource = avatarRegistry[avatarFile]?.source ?? avatarRegistry[fallbackAvatar].source;
  const frameSource = frameRegistry[frameFile]?.source ?? frameRegistry[fallbackFrame].source;
  const avatarSize = frameFile === 'frame_fire' ? 85 : 90;

  return (
    <View style={styles.header}>
      {/* IZQUIERDA: Avatar + Marco + Nick */}
      <View style={styles.left}>
        <View style={styles.preview}>
          <Image
            source={avatarSource}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              position: 'absolute',
              zIndex: 1,
            }}
          />
          <Image
            source={frameSource}
            style={[styles.frame, { position: 'absolute', zIndex: 2 }]}
          />
        </View>
        <Text style={styles.nick}>{nick}</Text>
      </View>

      {/* DERECHA: Monedas + Nivel */}
      <View style={styles.right}>
        <Text style={styles.coins}>🪙 {coins}</Text>
        <Text style={styles.level}>Nivel: {level}</Text>
      </View>
    </View>
  );
}
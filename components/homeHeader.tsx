import { router } from 'expo-router';
import React, { JSX } from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { avatarRegistry } from '../hooks/avatarRegistry';
import { frameRegistry } from '../hooks/frameRegistry';
import { styles } from './Styles/homeHeader.styles';


interface Props {
  avatarFile: string;
  frameFile: string;
  nick: string;
  coins: number;
  coinsScale?: Animated.Value;
  compact?: boolean;
}

export const HomeHeader: React.FC<Props> = ({
  avatarFile,
  frameFile,
  nick,
  coins,
  coinsScale,
  compact = false, // ✅ valor por defecto
}): JSX.Element => {
  const fallbackAvatar = 'avataaars17.png';
  const fallbackFrame = 'free.png';

  const avatarSource = avatarRegistry[avatarFile]?.source ?? avatarRegistry[fallbackAvatar].source;
  const frameSource = frameRegistry[frameFile]?.source ?? frameRegistry[fallbackFrame].source;
  const avatarSize = compact ? 70 : frameFile === 'frame_fire' ? 85 : 90;
  const scale = coinsScale ?? new Animated.Value(1);

  return (
    <View style={[styles.header, compact && styles.headerCompact]}>
      <TouchableOpacity onPress={() => router.push('/perfil')}>
        <View style={styles.preview}>
          <Image source={frameSource} style={[styles.frame, compact && styles.frameCompact]} />
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
        </View>
      </TouchableOpacity>
      <View>
        <Text style={[styles.nick, compact && styles.nickCompact]}>{nick}</Text>
        <Animated.Text style={[styles.coins, compact && styles.coinsCompact, { transform: [{ scale }] }]}>
          {coins} 🪙
        </Animated.Text>
      </View>
    </View>
  );
};

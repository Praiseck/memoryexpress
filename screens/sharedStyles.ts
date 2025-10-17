// sharedStyles.ts
import { StyleSheet } from 'react-native';

export const avatarFrameStyles = StyleSheet.create({
  preview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    zIndex: 1,
  },
  frame: {
    width: 120,
    height: 120,
    position: 'absolute',
    zIndex: 2,
  },
});
import { WortiseBanner } from '@wortise/react-native-sdk';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BANNER_IDS } from './config';

export const BannerProvider = ({ style }: { style?: object }) => {
  return (
    <View style={[styles.container, style]}>
      <WortiseBanner adUnitId={BANNER_IDS.wortise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});
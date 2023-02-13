import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { useAssets } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  //useStates
  const [appReady, setAppReady] = useState(false);

  //assetsReady
  // const [fontsLoaded] = useFonts({
  //   BMEuljiro: require('./assets/fonts/BMEuljiro10yearslaterOTF.otf'),
  //   Baemin: require('./assets/fonts/BMDOHYEON_otf.otf'),
  // });

  const fonts = [
    Font.loadAsync('baemin', require('./assets/fonts/BMDOHYEON_otf.otf')),
    Font.loadAsync(
      'baeminEuljiro',
      require('/Users/dhsong/Desktop/myMovie/assets/fonts/BMEuljiro10yearslaterOTF.otf')
    ),
  ];

  const imgs = [Asset.loadAsync(require('./assets/img/cat.jpg'))];

  //useEffect
  useEffect(() => {
    const prepare = async () => {
      await Promise.all([...fonts, ...imgs]);
      setAppReady(true);
    };
    prepare();
  }, []);

  //appReady -> Splashscreen off
  const onLayoutChange = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutChange}>
      <Text
        style={{
          fontFamily: 'baeminEuljiro',
          fontSize: 60,
        }}
      >
        배민-을지로체
      </Text>
      <Text style={{ fontFamily: 'baemin' }}>
        배달의민족 폰트 가져오기 테스트
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

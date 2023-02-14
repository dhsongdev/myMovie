//expo
import { StatusBar } from 'expo-status-bar';
import { Asset, useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//react-native
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//components
import Tabs from './navigator/Tabs';
import Stacks from './navigator/Stacks';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  //useStates
  const [appReady, setAppReady] = useState(false);

  //preload assets
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
      await Promise.all([...fonts, ...imgs]); //load assets functions
      setAppReady(true);
      //app ready -> hide splashscreen
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  if (!appReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
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

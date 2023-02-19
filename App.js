//expo
import { StatusBar } from 'expo-status-bar';
import { Asset, useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
//react-native
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styled, { ThemeProvider } from 'styled-components/native';
//components
import Roots from './navigator/Roots';
import { lightMode, darkMode } from './themeColors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  //useStates
  const [appReady, setAppReady] = useState(false);

  const colorScheme = useColorScheme();

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
    <ThemeProvider theme={colorScheme == 'light' ? lightMode : darkMode}>
      <NavigationContainer>
        <Roots />
      </NavigationContainer>
    </ThemeProvider>
  );
}

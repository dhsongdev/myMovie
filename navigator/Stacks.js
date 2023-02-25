import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Detail from '../screens/Detail';

import React from 'react';
import { Button, useColorScheme, Platform } from 'react-native';

import { darkMode, lightMode } from '../themeColors';

const Stack = createNativeStackNavigator();

export default function Stacks({
  navigation: { goBack, setParams },
  route: { params },
}) {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft:
            Platform.OS === 'ios'
              ? () => <Button onPress={() => goBack()} title="Back" />
              : null,
          headerStyle: {
            backgroundColor:
              colorScheme === 'dark' ? darkMode.mainBG : lightMode.mainBG,
          },
          headerTitleStyle: {
            color:
              colorScheme === 'dark'
                ? darkMode.mainTextColor
                : lightMode.mainTextColor,
          },
        }}
        name={params.type === 'movie' ? 'Movie Detail' : 'TV show Detail'}
        initialParams={{ type: params.type, preData: params.data }}
        component={Detail}
      />
    </Stack.Navigator>
  );
}

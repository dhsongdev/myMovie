import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Stack1 from '../screens/Stack1';
import Stack2 from '../screens/Stack2';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stack1" component={Stack1} />
      <Stack.Screen name="Stack2" component={Stack2} />
    </Stack.Navigator>
  );
}

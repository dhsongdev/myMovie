import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Detail from '../screens/Detail';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Stacks({ route: { params } }) {
  console.log(params);
  return (
    <Stack.Navigator>
      <Stack.Screen name={params.title} component={Detail} />
      {/* <Stack.Screen name="Stack2" component={Stack2} /> */}
    </Stack.Navigator>
  );
}

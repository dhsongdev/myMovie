import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Stack2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>I'm Stack2</Text>
    </View>
  );
}

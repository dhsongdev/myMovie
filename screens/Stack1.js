import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Stack1({ navigation: { navigate } }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          navigate('Stack2');
        }}
        style={{ backgroundColor: 'tomato', borderRadius: 10 }}
      >
        <Text style={{ fontSize: 30, padding: 10 }}>Go Stack2</Text>
      </TouchableOpacity>
    </View>
  );
}

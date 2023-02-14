import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const Home = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          navigate('Stake');
        }}
        style={{ backgroundColor: 'tomato', borderRadius: 10 }}
      >
        <Text style={{ fontSize: 30, padding: 10 }}>Stake</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stake = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>I'm stake</Text>
    </View>
  );
};

export default function myStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Stake" component={Stake} />
    </Stack.Navigator>
  );
}

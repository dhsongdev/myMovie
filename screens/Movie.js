import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Movie({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigate('Stacks');
        }}
      >
        <Text style={{ fontFamily: 'baemin', fontSize: 40 }}>무비</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

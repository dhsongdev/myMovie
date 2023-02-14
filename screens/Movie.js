import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Movie = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'baemin' }}>무비</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Movie;

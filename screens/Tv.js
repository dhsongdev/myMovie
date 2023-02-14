import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const Tv = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={{ fontFamily: 'baemin', fontSize: 40 }}>TV의 민족</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
  },
});

export default Tv;

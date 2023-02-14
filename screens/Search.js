import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'baemin' }}>검색</Text>
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

export default Search;

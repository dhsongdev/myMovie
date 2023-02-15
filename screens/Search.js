import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import styled from 'styled-components';

const Main = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

const Text = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

export default function Search() {
  return (
    <Main>
      <View>
        <Text style={{ fontFamily: 'baemin', fontSize: 40 }}>검색</Text>
      </View>
    </Main>
  );
}

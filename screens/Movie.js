import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import styled from 'styled-components';

const Main = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

const Text = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

export default function Movie() {
  return (
    <Main>
      <View>
        <Text style={{ fontFamily: 'baemin', fontSize: 40 }}>무비의 민족</Text>
      </View>
    </Main>
  );
}

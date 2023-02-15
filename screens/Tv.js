import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import styled from 'styled-components';

const Main = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

const Text = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

const Tv = () => {
  return (
    <Main>
      <Text style={{ fontFamily: 'baemin', fontSize: 40 }}>TV의 민족</Text>
    </Main>
  );
};

export default Tv;

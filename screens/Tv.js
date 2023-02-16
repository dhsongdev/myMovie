import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import styled from 'styled-components/native';

const Main = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

const Text = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

const Tv = () => {
  return <Main></Main>;
};

export default Tv;

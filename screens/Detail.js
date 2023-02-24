import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components';
import { darkMode, lightMode } from '../themeColors';

const windowWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();

const imgPath = (path) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

const BackDrop = styled.Image`
  position: absolute;
  width: 100%;
  height: 250px;
  top: 0;
`;

const Poster = styled.Image`
  width: 120px;
  height: 180px;
  margin-left: 15px;
  border-radius: 6px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px 6px black;
  margin-left: 15px;
  width: ${windowWidth - 165}px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
  padding: 30px;
`;

export default function Detail({
  route: {
    params: { preData, type },
  },
}) {
  const colorScheme = useColorScheme();

  return (
    <Container>
      <View
        style={{
          width: '100%',
          height: 250,
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <BackDrop source={{ uri: imgPath(preData.backdrop_path) }} />
        <BlurView
          intensity={20}
          style={{ width: '100%', height: 250, position: 'absolute' }}
        ></BlurView>
        <LinearGradient
          colors={[
            'transparent',
            colorScheme === 'dark' ? darkMode.subBG : lightMode.subBG,
          ]}
          style={{ width: '100%', height: 250, position: 'absolute' }}
        />
        <Poster source={{ uri: imgPath(preData.poster_path) }} />
        <Title>{type === 'movie' ? preData.title : preData.name}</Title>
      </View>
      <Overview>{preData.overview}</Overview>
    </Container>
  );
}

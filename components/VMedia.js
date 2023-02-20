import React, { useEffect, useState } from 'react';
import { View, Text, useColorScheme, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styled from 'styled-components';

import { lightMode, darkMode } from '../themeColors';

const windowWidth = Dimensions.get('window').width;

const imgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const Container = styled.TouchableOpacity`
  padding: 10px;
  margin-bottom: 10px;
  flex-direction: row;
`;

const PosterImg = styled.Image`
  height: 210px;
  width: 140px;
  border-radius: 5px;
`;

const Info = styled.View`
  width: ${windowWidth - 175}px;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 21px;
  font-weight: 600;
  color: ${(props) => props.theme.mainTextColor};
`;

const VoteAverage = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 17px;
  opacity: 0.7;
`;

const ReleaseDate = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  opacity: 0.8;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.subTextColor};
`;

export default function VMedia({ data, index }) {
  const colorScheme = useColorScheme();
  return (
    <Container>
      <PosterImg source={{ uri: imgPath(data.poster_path) }} />
      <Info>
        <Title>
          #{index + 1}
          {`  `}
          {data.title.split(':', 1)}
        </Title>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons
            name="star-rate"
            size={20}
            style={{ opacity: 0.7 }}
            color={
              colorScheme === 'dark'
                ? darkMode.mainTextColor
                : lightMode.mainTextColor
            }
          />
          <VoteAverage>{data.vote_average}</VoteAverage>
        </View>
        <ReleaseDate>{data.release_date}</ReleaseDate>
        <Overview>
          {data.overview.substring(
            0,
            data.overview.slice(0, 200).lastIndexOf(' ')
          )}
          ...
        </Overview>
      </Info>
    </Container>
  );
}

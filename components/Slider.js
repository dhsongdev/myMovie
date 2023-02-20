import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import styled from 'styled-components';

const imgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const Container = styled.View`
  width: 100%;
`;

const Title = styled.Text`
  font-size: 30px;
  padding: 10px;
  margin-top: 5px;
  font-weight: 600;
  color: ${(props) => props.theme.mainTextColor};
`;

const PosterSlider = styled.ScrollView``;

const PosterImg = styled.Image`
  height: 180px;
  width: 120px;
  border-radius: 5px;
`;

const PosterTitle = styled.Text`
  font-size: 15px;
`;

export default function Slider({ data, title }) {
  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 5 }} key={item.id}>
        <TouchableOpacity>
          <PosterImg
            source={{
              uri: `${imgPath(item.poster_path)}`,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return data === null ? (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}
    >
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Container>
      <Title>{title}</Title>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
      />
    </Container>
  );
}

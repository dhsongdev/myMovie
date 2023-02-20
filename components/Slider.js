import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

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
  height: 240px;
  width: 160px;
  border-radius: 10px;
`;

const PosterTitle = styled.Text`
  font-size: 15px;
`;

export default function Slider({ data, title }) {
  return (
    <Container>
      <Title>{title}</Title>
      <PosterSlider showsHorizontalScrollIndicator={false} horizontal={true}>
        {data.map((data, index) => (
          <View style={{ margin: 5 }} key={data.id}>
            <TouchableOpacity>
              <PosterImg
                source={{
                  uri: `${imgPath(data.poster_path)}`,
                }}
              />
            </TouchableOpacity>
            {/* <PosterTitle>{data.original_title}</PosterTitle> */}
          </View>
        ))}
      </PosterSlider>
    </Container>
  );
}

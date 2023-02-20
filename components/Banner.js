//now playing movies
import React from 'react';
import { Dimensions, Image, ActivityIndicator } from 'react-native';

import { useQuery } from 'react-query';

import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { API_KEY } from '@env';

const windowWidth = Dimensions.get('window').width;

const backdropPath = (path) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

const Banner = styled.View`
  padding: 25px;
`;

//Banner image title style
const BannerTitle = styled.Text`
  font-size: ${windowWidth / 15}px;
  font-weight: 300;
  text-shadow: black 0 0 6px;
`;

export default function MovieTopBanner() {
  const { isLoading, data } = useQuery('nowPlaying', () =>
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json())
  );

  return (
    <Swiper
      autoplay={true}
      width={windowWidth}
      height={windowWidth / 1.8}
      autoplayTimeout={5}
      showsButtons={false}
      showsPagination={false}
    >
      {isLoading === true ? (
        <ActivityIndicator
          style={{ width: windowWidth, height: windowWidth / 1.8 }}
        ></ActivityIndicator>
      ) : (
        data.results.map((a, index) => (
          <Banner key={a.id}>
            <Image
              source={{
                uri: backdropPath(a.backdrop_path),
              }}
              style={{
                width: windowWidth,
                height: windowWidth / 1.8,
                position: 'absolute',
              }}
            />
          </Banner>
        ))
      )}
    </Swiper>
  );
}

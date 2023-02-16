import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ActivityIndicator } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { API_KEY } from '@env';

const windowWidth = Dimensions.get('window').width;

const backdropPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const Banner = styled.View`
  padding: 20px;
`;

//Banner image title style
const BannerTitle = styled.Text`
  font-size: ${windowWidth / 15}px;
  font-weight: 300;
  text-shadow: white 0 0 6px;
`;

export default function MovieTopBanner() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUpComing = async () => {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getUpComing();
  }, []);

  return (
    <Swiper
      autoplay={true}
      width={windowWidth}
      height={windowWidth / 1.8}
      autoplayTimeout={5}
      showsButtons={false}
      showsPagination={false}
    >
      {loading === true ? (
        <ActivityIndicator
          style={{ width: windowWidth, height: windowWidth / 1.8 }}
        ></ActivityIndicator>
      ) : (
        data.map((array, index) => (
          <Banner key={data[index].id}>
            <Image
              source={{
                uri: `${backdropPath(data[index].backdrop_path)}`,
              }}
              style={{
                width: windowWidth,
                height: windowWidth / 1.8,
                position: 'absolute',
              }}
            />

            <BannerTitle>
              <MaterialIcons
                name="star-rate"
                size={windowWidth / 20}
                color="black"
              />
              {data[index].vote_average}
            </BannerTitle>
          </Banner>
        ))
      )}
    </Swiper>
  );
}

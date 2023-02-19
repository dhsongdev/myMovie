//react components
import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import styled from 'styled-components/native';

import MovieTopBanner from '../components/Banner';
import Slider from '../components/Slider';

import { API_KEY } from '@env';

//Main components: container
const Main = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

//screen
export default function Movie() {
  const [refreshing, setRefreshing] = useState(false);
  const [populars, setPopulars] = useState([]);
  const [loading, setLoading] = useState(true);

  const getpopulars = async () => {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      )
    ).json();
    setPopulars(data.results);
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getpopulars();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getpopulars();
  }, []);

  return (
    <Main
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MovieTopBanner />
      {loading === true ? null : (
        <Slider data={populars} title={'Popular Now'} />
      )}
      {loading === true ? null : (
        <Slider data={populars} title={'Trending Now'} />
      )}
      {loading === true ? null : <Slider data={populars} title={'Random'} />}
    </Main>
  );
}

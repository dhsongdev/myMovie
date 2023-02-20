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
  const [upcomings, setUpcomings] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPopulars = async () => {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      )
    ).json();
    setPopulars(data.results);
  };

  const getUpcomings = async () => {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcomings(data.results);
  };

  const getTopRated = async () => {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setTopRated(data.results);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getPopulars();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getPopulars();
    getUpcomings();
    getTopRated();
    setLoading(false);
  }, []);

  return (
    <Main
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MovieTopBanner />
      {loading === true ? null : <Slider data={upcomings} title={'Upcoming'} />}
      {loading === true ? null : (
        <Slider data={populars} title={'Popular Now'} />
      )}
      {loading === true ? null : <Slider data={topRated} title={'Top Rated'} />}
    </Main>
  );
}

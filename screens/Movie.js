//react components
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import styled from 'styled-components/native';

import MovieTopBanner from '../components/Banner';
import Slider from '../components/Slider';
import VMedia from '../components/VMedia';

import { API_KEY } from '@env';

//Main components: container
const Main = styled.FlatList`
  background-color: ${(props) => props.theme.subBG};
`;

const Title = styled.Text`
  font-size: 30px;
  padding: 10px;
  margin-top: 5px;
  font-weight: 600;
  color: ${(props) => props.theme.mainTextColor};
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
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`
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
      getData();
      setRefreshing(false);
    }, 2000);
  }, []);

  const getData = async () => {
    await Promise.all([getPopulars(), getUpcomings(), getTopRated()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Main
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <View>
          <MovieTopBanner />
          <Slider data={upcomings} title={'Upcoming'} />
          <Slider data={topRated} title={'Top Rated'} />
          <Title>Popular Now</Title>
        </View>
      }
      data={populars}
      renderItem={({ item, index }) => <VMedia data={item} index={index} />}
    />
  );
}

//react components
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import MovieTopBanner from '../components/Banner';
import Slider from '../components/Slider';
import VMedia from '../components/VMedia';
import { movies } from '../api';

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

  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
  } = useQuery('upcoming', movies.upcoming);
  const {
    isLoading: topRatedLoading,
    error: topRatedError,
    data: topRatedData,
  } = useQuery('topRated', movies.topRated);
  const {
    isLoading: popularLoading,
    error: popularError,
    data: popularData,
  } = useQuery('popular', movies.popular);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Main
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <View>
          <MovieTopBanner />
          <Slider
            data={upcomingLoading === false ? upcomingData.results : null}
            title={'Upcoming'}
          />
          <Slider
            data={topRatedLoading === false ? topRatedData.results : null}
            title={'Top Rated'}
          />
          <Title>Popular Now</Title>
        </View>
      }
      data={popularLoading === false ? popularData.results : null}
      renderItem={({ item, index }) => <VMedia data={item} index={index} />}
    />
  );
}

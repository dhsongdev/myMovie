//react components
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';

import { useQuery, QueryClient } from 'react-query';
import styled from 'styled-components/native';

import MovieTopBanner from '../components/Banner';
import Slider from '../components/Slider';
import VMedia from '../components/VMedia';
import { movies } from '../api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

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
    data: upcomingData,
    isRefetching: upcomingRefetching,
  } = useQuery(['upcoming', 'movies'], movies.upcoming);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
  } = useQuery(['topRated', 'movies'], movies.topRated);
  const {
    isLoading: popularLoading,
    data: popularData,
    isRefetching: popularRefetching,
  } = useQuery(['movies', 'popular'], movies.popular);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

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

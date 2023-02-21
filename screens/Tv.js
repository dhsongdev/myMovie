//react components
import React, { useState } from 'react';

import { useQuery, QueryClient } from 'react-query';
import styled from 'styled-components/native';

import Slider from '../components/Slider';
import { tvs } from '../api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

//Main components: container
const Main = styled.ScrollView`
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
export default function Tv() {
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: onTheAirLoading,
    data: onTheAirData,
    isRefetching: onTheAirRefetching,
  } = useQuery(['tvs', 'onTheAir'], tvs.onTheAir);
  const {
    isLoading: popularLoading,
    data: popularData,
    isRefetching: popularRefetching,
  } = useQuery(['tvs', 'popular'], tvs.popular);
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
  } = useQuery(['tvs', 'topRated'], tvs.topRated);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tvs']);
    setRefreshing(false);
  };

  return (
    <Main>
      <Slider
        data={popularLoading === false ? popularData.results : null}
        title={'Popular'}
      />
      <Slider
        data={topRatedLoading === false ? topRatedData.results : null}
        title={'Top Rated'}
      />
      <Slider
        data={onTheAirLoading === false ? onTheAirData.results : null}
        title={'On the Air'}
      />
    </Main>
  );
}

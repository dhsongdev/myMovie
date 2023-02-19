//react components
import React, { useEffect, useState } from 'react';

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
  const [populars, setPopulars] = useState([]);
  const [loading, setLoading] = useState(true);

  const getpopulars = async () => {
    const data = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=bbbb0a1d7e005e258af9072da3838e01&language=en-US'
      )
    ).json();
    setPopulars(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getpopulars();
  }, []);

  return (
    <Main>
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

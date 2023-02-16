//react components
import React from 'react';

import styled from 'styled-components/native';

import MovieTopBanner from '../components/Banner';

//Main components: container
const Main = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

//screen
export default function Movie() {
  return (
    <Main>
      <MovieTopBanner />
    </Main>
  );
}

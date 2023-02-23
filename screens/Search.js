import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useQuery, QueryClient } from 'react-query';

import { search } from '../api';
import { lightMode, darkMode } from '../themeColors';

import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get('window').width;

const imgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const Main = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.subBG};
  align-items: center;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

const SearchBar = styled.TextInput`
  color: ${(props) => props.theme.mainTextColor};
  opacity: 0.7;
  border: solid lightgrey 0.4px;
  border-radius: 20px;
  margin: 15px 0px 11px 0px;
  padding: 10px 20px;
  width: 90%;
`;

const SelectBarContainer = styled.View`
  width: ${windowWidth}px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const SelectBar = styled.View`
  border-radius: 5px;
  width: 97%;
  height: 25px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  width: 49%;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.TouchableOpacity`
  padding: 10px;
  margin-bottom: 10px;
  flex-direction: row;
`;

const PosterImg = styled.Image`
  height: 180px;
  width: 120px;
  border-radius: 5px;
  background-color: #9a86a4;
`;

const Info = styled.View`
  width: ${windowWidth - 180}px;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${(props) => props.theme.mainTextColor};
`;

const ReleaseDate = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  opacity: 0.8;
  margin-bottom: 5px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.subTextColor};
`;

export default function Search() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [params, setParams] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('movie');

  const { data: movieSearchData, refetch: refetchMovieSearch } = useQuery(
    ['movieSearch', params],
    search.movie,
    { enabled: false }
  );
  const { data: tvSearchData, refetch: refethTvSearch } = useQuery(
    ['tvSearch', params],
    search.tv,
    { enabled: false }
  );

  const onChangeParams = ({ nativeEvent: { text: input } }) => {
    setParams(input);
  };

  const onPressMovie = () => {
    setSelected('movie');
  };
  const onPressTv = () => {
    setSelected('tv');
  };

  const onSubmit = async () => {
    if (params === '') {
      return;
    }
    setLoading(true);
    refetchMovieSearch();
    refethTvSearch();
    setLoading(false);
  };

  const SearchScreen = ({ movieSearchData, tvSearchData }) => {
    const data = selected === 'movie' ? movieSearchData : tvSearchData;
    return loading === true ? (
      <ActivityIndicator
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === 'dark' ? darkMode.subBG : lightMode.subBG,
        }}
      ></ActivityIndicator>
    ) : data === undefined ? (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text style={{ opacity: 0.5 }}>Search Anything!</Text>
      </View>
    ) : data.results.length === 0 ? (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text style={{ opacity: 0.5 }}>No Results :(</Text>
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={{ padding: 10 }}
        style={{ width: windowWidth }}
      >
        {data.results.map((array) => (
          <Container
            onPress={() =>
              navigation.navigate(
                'Stacks',
                array.original_name
                  ? { type: 'tv', title: array.original_name, id: array.id }
                  : { type: 'movie', title: array.original_title, id: array.id }
              )
            }
            key={array.id}
          >
            {array.poster_path === null ? (
              <PosterImg source={require('../assets/img/cat.jpg')} />
            ) : (
              <PosterImg source={{ uri: imgPath(array.poster_path) }} />
            )}

            <Info>
              <Title>{selected === 'movie' ? array.title : array.name}</Title>
              <ReleaseDate>
                {selected === 'movie'
                  ? array.release_date
                  : array.first_air_date
                  ? array.first_air_date
                  : '---'}
              </ReleaseDate>
              <Overview>
                {array.overview.length > 150
                  ? `${array.overview.substring(
                      0,
                      array.overview.slice(0, 150).lastIndexOf(' ')
                    )}...`
                  : array.overview}
              </Overview>
            </Info>
          </Container>
        ))}
      </ScrollView>
    );
  };

  const MovieButton = () => (
    <Button
      style={{ backgroundColor: selected === 'movie' ? 'darkgrey' : null }}
      onPress={onPressMovie}
    >
      <Text>Movie</Text>
    </Button>
  );

  const TvButton = () => (
    <Button
      style={{ backgroundColor: selected === 'tv' ? 'darkgrey' : null }}
      onPress={onPressTv}
    >
      <Text>Tv</Text>
    </Button>
  );
  const Bar = () => (
    <SelectBarContainer>
      <SelectBar
        style={{
          backgroundColor: colorScheme === 'dark' ? 'grey' : '#FAD4D4',
        }}
      >
        <MovieButton />
        <TvButton />
      </SelectBar>
    </SelectBarContainer>
  );

  return (
    <Main>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: colorScheme === 'dark' ? '#282A3A' : 'white',
        }}
      >
        <SearchBar
          onChange={onChangeParams}
          value={params}
          onSubmitEditing={onSubmit}
        />
        <Bar />
      </View>

      <SearchScreen
        movieSearchData={movieSearchData}
        tvSearchData={tvSearchData}
      />
    </Main>
  );
}

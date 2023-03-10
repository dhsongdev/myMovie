import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import styled from 'styled-components';

import { MaterialIcons } from '@expo/vector-icons';
import { lightMode, darkMode } from '../themeColors';
import { useNavigation } from '@react-navigation/native';

const imgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const Container = styled.View`
  width: 100%;
`;

const Title = styled.Text`
  font-size: 30px;
  padding: 10px;
  margin-top: 5px;
  font-weight: 600;
  color: ${(props) => props.theme.mainTextColor};
`;

const PosterImg = styled.Image`
  height: 180px;
  width: 120px;
  border-radius: 5px;
  background-color: grey;
`;

const TvTitle = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 14px;
  font-weight: 600;
`;

const TvScore = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 14px;
  margin-left: 2px;
`;

export default function Slider({ data, title }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 7 }} key={item.id}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              'Stacks',
              item.original_name
                ? { type: 'tv', data: item }
                : { type: 'movie', data: item }
            );
          }}
        >
          <PosterImg
            source={{
              uri: `${imgPath(item.poster_path)}`,
            }}
          />
          {item.original_name ? (
            <View style={{ marginTop: 5, alignItems: 'center' }}>
              <TvTitle>
                {item.name.length > 10
                  ? `${item.name.slice(0, 9)}...`
                  : item.name}
              </TvTitle>
              {item.vote_average > 0 ? (
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <MaterialIcons
                    name="star-rate"
                    size={16}
                    color={
                      colorScheme === 'dark'
                        ? darkMode.subTextColor
                        : lightMode.subTextColor
                    }
                  />
                  <TvScore>{item.vote_average.toFixed(1)}</TvScore>
                </View>
              ) : null}
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return data === null ? (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}
    >
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Container>
      <Title>{title}</Title>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
      />
    </Container>
  );
}

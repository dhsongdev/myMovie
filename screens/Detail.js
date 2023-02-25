import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
  Button,
} from 'react-native';

import { useQuery } from 'react-query';

import { tvs, movies } from '../api';

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

import styled from 'styled-components';
import { darkMode, lightMode } from '../themeColors';

const windowWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();

const imgPath = (path) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

const Text = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.subBG};
`;

const BackDrop = styled.Image`
  position: absolute;
  width: 100%;
  height: 250px;
  top: 0;
`;

const Poster = styled.Image`
  width: 120px;
  height: 180px;
  margin-left: 15px;
  border-radius: 6px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px 6px black;
  margin-left: 15px;
  width: ${windowWidth - 165}px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
  padding: 30px 30px 10px 30px;
  font-size: 15px;
`;

const Keywords = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  margin: 2px;
  margin-right: 7px;
`;

const SliderContainer = styled.View`
  width: 100%;
`;
const SliderTitle = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
  font-size: 20px;
  font-weight: 600;
  padding: 0px 30px;
  margin-top: 14px;
`;
const Slider = styled.ScrollView``;

export default function Detail({
  route: {
    params: { preData, type },
  },
}) {
  const colorScheme = useColorScheme();

  const { data, isLoading } =
    type === 'tv'
      ? useQuery(['details', preData.id], tvs.detail)
      : useQuery(['details', preData.id], movies.detail);

  return (
    <Container>
      <View
        style={{
          width: '100%',
          height: 250,
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <BackDrop source={{ uri: imgPath(preData.backdrop_path) }} />
        <BlurView
          intensity={0}
          style={{ width: '100%', height: 250, position: 'absolute' }}
        ></BlurView>
        <LinearGradient
          colors={[
            'transparent',
            colorScheme === 'dark' ? darkMode.subBG : lightMode.subBG,
          ]}
          style={{ width: '100%', height: 250, position: 'absolute' }}
        />
        <Poster source={{ uri: imgPath(preData.poster_path) }} />
        <Title>{type === 'movie' ? preData.title : preData.name}</Title>
      </View>
      {isLoading === true ? null : (
        <View style={{ width: '100%' }}>
          <Overview>
            {preData.overview === '' ? data.overview : preData.overview}
          </Overview>
          <View
            style={{
              width: '100%',
              flexWrap: 'wrap',
              flexDirection: 'row',
              paddingHorizontal: 30,
              marginBottom: 20,
            }}
          >
            {type === 'movie'
              ? data.keywords.keywords.map((keywordName, index) => (
                  <Keywords key={'keywordKey' + index}>
                    #{keywordName.name}
                  </Keywords>
                ))
              : data.keywords.results.map((keywordName, index) => (
                  <Keywords key={'keywordKey' + index}>
                    #{keywordName.name}
                  </Keywords>
                ))}
          </View>
          {data.homepage ? (
            <View
              style={{
                backgroundColor: 'grey',
                marginHorizontal: 30,
                borderRadius: 10,
              }}
            >
              <Button
                color="white"
                title={'Homepage'}
                onPress={async () =>
                  await WebBrowser.openBrowserAsync(data.homepage)
                }
              />
            </View>
          ) : null}
          <SliderContainer>
            <SliderTitle>Company</SliderTitle>
            <Slider
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
            >
              {data.production_companies.map((company, index) => (
                <View
                  style={{ height: 50, margin: 10, backgroudColor: 'white' }}
                  key={'companies' + company.id}
                >
                  {company.logo_path === null ? (
                    <View style={{ height: 50, justifyContent: 'center' }}>
                      <Text>{company.name}</Text>
                    </View>
                  ) : (
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'contain',
                      }}
                      source={{ uri: imgPath(company.logo_path) }}
                    />
                  )}
                </View>
              ))}
            </Slider>
          </SliderContainer>

          {data.videos.results ? (
            <View>
              <SliderTitle style={{ marginBottom: 10 }}>Videos</SliderTitle>
              {data.videos.results.map((video) => (
                <View
                  key={video.id}
                  style={{
                    marginVertical: 0.5,
                    backgroundColor:
                      colorScheme === 'dark'
                        ? darkMode.mainBG
                        : lightMode.mainBG,
                  }}
                >
                  <Button
                    color={
                      colorScheme === 'dark'
                        ? darkMode.subTextColor
                        : lightMode.subTextColor
                    }
                    title={`${video.site} | ${video.name}`}
                    onPress={async () =>
                      await WebBrowser.openBrowserAsync(
                        `https://www.youtube.com/watch?v=${video.key}`
                      )
                    }
                  />
                </View>
              ))}
            </View>
          ) : null}
        </View>
      )}
    </Container>
  );
}

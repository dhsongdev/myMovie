import { API_KEY } from '@env';
const BASE_URL = 'https://api.themoviedb.org/3/';

export const movies = {
  popular: () =>
    fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  upcoming: () =>
    fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
};

export const tvs = {
  onTheAir: () =>
    fetch(`${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  popular: () =>
    fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
};

export const search = {
  movie: ({ queryKey }) =>
    fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${queryKey[1]}`
    ).then((res) => res.json()),
  tv: ({ queryKey }) =>
    fetch(
      `${BASE_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${queryKey[1]}`
    ).then((res) => res.json()),
};

import { API_KEY } from '@env';
const BASE_URL = 'https://api.themoviedb.org/3/';

export const movies = {
  popular: () =>
    fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=ko-KR`).then(
      (res) => res.json()
    ),
  upcoming: () =>
    fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=ko-KR`).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=ko-KR`).then(
      (res) => res.json()
    ),
  detail: ({ queryKey }) =>
    fetch(
      `${BASE_URL}movie/${queryKey[1]}?api_key=${API_KEY}&language=en-US&append_to_response=videos%2Cimages%2Ckeywords`
    ).then((res) => res.json()),
};

export const tvs = {
  trending: () =>
    fetch(`${BASE_URL}trending/tv/day?api_key=${API_KEY}&language=ko-KR`).then(
      (res) => res.json()
    ),
  popular: () =>
    fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=ko-KR`).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=ko-KR`).then(
      (res) => res.json()
    ),
  detail: ({ queryKey }) =>
    fetch(
      `${BASE_URL}tv/${queryKey[1]}?api_key=${API_KEY}&language=en-US&append_to_response=videos%2Cimages%2Ckeywords`
    ).then((res) => res.json()),
};

export const search = {
  movie: ({ queryKey }) =>
    fetch(
      `${BASE_URL}search/movie?api_key=${API_KEY}&language=ko-KR&query=${queryKey[1]}`
    ).then((res) => res.json()),
  tv: ({ queryKey }) =>
    fetch(
      `${BASE_URL}search/tv?api_key=${API_KEY}&language=ko-KR&query=${queryKey[1]}`
    ).then((res) => res.json()),
};

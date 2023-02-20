import { API_KEY } from '@env';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';

const popular = () =>
  fetch(`${BASE_URL}popular?api_key=${API_KEY}&language=en-US`).then((res) =>
    res.json()
  );
const upcoming = () =>
  fetch(`${BASE_URL}upcoming?api_key=${API_KEY}&language=en-US`).then((res) =>
    res.json()
  );
const topRated = () =>
  fetch(`${BASE_URL}top_rated?api_key=${API_KEY}&language=en-US`).then((res) =>
    res.json()
  );
export const movies = { popular, upcoming, topRated };

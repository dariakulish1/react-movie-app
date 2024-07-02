import { headers } from './headers';

const options = {
  method: 'GET',
  headers,
};

export const urlApi = (url) => {
  return `https://api.themoviedb.org/3/${url}language=en-US&page=1`;
};

export const getMovieFetch = (url) => {
  return fetch(urlApi(url), options).then((response) => {
    if (!response.ok) {
      return Promise.reject(Error('Error'));
    }
    return response.json();
  });
};

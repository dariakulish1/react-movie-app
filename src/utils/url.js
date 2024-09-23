import { headers } from './headers';

const options = {
  method: 'GET',
  headers,
};

export const urlApi = (url, pageNum) => {
  return `https://api.themoviedb.org/3/${url}language=en-US&page=${pageNum}`;
};

export const getRequest = (url, pageNum) => {
  return fetch(urlApi(url, pageNum), options).then((response) => {
    if (!response.ok) {
      return Promise.reject(Error('Error'));
    }
    return response.json();
  });
};

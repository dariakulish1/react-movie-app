import { headers } from './headers';

const options = {
  method: 'GET',
  headers,
};

export const urlApi = (url, ln, pageNum) => {
  return `https://api.themoviedb.org/3/${url}language=${ln}-US&page=${pageNum}`;
};

export const getRequest = (url, ln, pageNum) => {
  return fetch(urlApi(url, ln, pageNum), options).then((response) => {
    if (!response.ok) {
      return Promise.reject(Error('Error'));
    }
    return response.json();
  });
};

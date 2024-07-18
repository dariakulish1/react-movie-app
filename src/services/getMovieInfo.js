import { getRequest } from '../utils/url';

export const getMovieInfo = (movieId) => {
  return getRequest(`movie/${movieId}?`).then(
    ({
      poster_path: posterPath,
      original_title: originalTitle,
      vote_average: voteAverage,
      release_date: releaseDate,
      ...rest
    }) => {
      return {
        ...rest,
        posterPath,
        originalTitle,
        voteAverage,
        releaseDate,
      };
    },
  );
};

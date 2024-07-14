import { getRequest } from './url';

export const getPopularMovie = (movieId) => {
  getRequest(`movie/${movieId}?`).then(
    ({
      poster_path: posterPath,
      title,
      original_title: originalTitle,
      vote_average: voteAverage,
      release_date: releaseDate,
      runtime,
      overview,
    }) => {
      return {
        posterPath,
        title,
        originalTitle,
        voteAverage,
        releaseDate,
        runtime,
        overview,
      };
    },
  );
};

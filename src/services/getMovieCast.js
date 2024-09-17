import { getRequest } from '../utils/url';

export const getMovieCast = (movieId) => {
  return getRequest(`movie/${movieId}/credits?`, 1).then(
    ({ profile_path: profilePath, ...rest }) => {
      return {
        ...rest,
        profilePath,
      };
    },
  );
};

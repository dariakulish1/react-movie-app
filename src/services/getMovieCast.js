import { getRequest } from '../utils/url';

export const getMovieCast = (movieId, ln) => {
  return getRequest(`movie/${movieId}/credits?`, ln, 1).then(
    ({ profile_path: profilePath, ...rest }) => {
      return {
        ...rest,
        profilePath,
      };
    },
  );
};

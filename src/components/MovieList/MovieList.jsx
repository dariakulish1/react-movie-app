import PropTypes from 'prop-types';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      originalTitle: PropTypes.string,
      voteAverage: PropTypes.number,
      posterPath: PropTypes.string,
      genresIds: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
};

export const MovieList = ({ movies, genres }) => {
  return (
    <div className="div-list container">
      {movies?.map(
        ({
          id,
          title,
          original_title: originalTitle,
          vote_average: voteAverage,
          poster_path: posterPath,
          genre_ids: genresIds,
        }) => {
          movies.forEach((movie) => {
            const { genre_ids: genresIds } = movie;
            genresIds.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              return genre.name;
            });
          });

          return (
            <FlexBoxes
              key={id}
              genresIds={genresIds}
              genres={genres}
              title={title}
              movieId={id}
              originalTitle={originalTitle}
              voteAverage={voteAverage}
              posterPath={posterPath}
            />
          );
        },
      )}
    </div>
  );
};

MovieList.propTypes = propTypes;

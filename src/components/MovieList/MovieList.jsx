import PropTypes from 'prop-types';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';

const propTypes = {
  activebounding: PropTypes.node.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      original_title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      poster_path: PropTypes.node.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
};
export const MovieList = ({ activebounding, movies, genres }) => {
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
            const allGenres = genresIds.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              return genre.name;
            });
            console.log('allGenres(ML) ', allGenres);
          });
          return (
            <FlexBoxes
              genresIds={genresIds}
              genres={genres}
              title={title}
              activebounding={activebounding}
              movieId={id}
              original_title={originalTitle}
              vote_average={voteAverage}
              poster_path={posterPath}
            />
          );
        },
      )}
    </div>
  );
};

MovieList.propTypes = propTypes;

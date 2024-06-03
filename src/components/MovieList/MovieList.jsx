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
    }),
  ).isRequired,
};
export const MovieList = ({ activebounding, movies, genres }) => {
  // movies.forEach((movie) => {
  //   const { genresIds } = movie;
  //   genresIds.forEach((genreId) => {
  //     genresIds = genres.id;
  //     console.log('genreId Movielist', genreId);
  //   });
  // });
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
            genresIds.forEach((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              console.log('genreId MovieList', genreId, genre?.name);
            });
          });
          return (
            <FlexBoxes
              genresids={genresIds}
              genres={genres}
              title={title}
              activebounding={activebounding}
              movieid={id}
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

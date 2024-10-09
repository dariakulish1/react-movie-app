import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './MovieList.scss';
import { FlexBoxes } from '../FlexBoxes';
import { genresSelector } from '../../redux/selectors';

const propTypes = {
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

export const MovieList = ({ movies }) => {
  const genres = useSelector(genresSelector);
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
          const allGenres = genresIds
            .map((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              return genre.name;
            })
            .slice(0, 3)
            .join(' • ');

          return (
            <FlexBoxes
              key={id}
              allGenres={allGenres}
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

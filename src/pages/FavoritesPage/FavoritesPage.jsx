import './FavoritesPage.scss';
import { MovieList } from '../../components/MovieList';
import farstar from '../../images/far star.svg';

export const FavoritesPage = () => {
  return (
    <div className="saved-movie container inter">
      <h1 className="saved-movie__page-head">Favorites</h1>
      <MovieList
        activebounding={
          <img
            className="saved-movie__bounding cursor"
            src={farstar}
            alt="far-star"
          />
        }
      />
    </div>
  );
};

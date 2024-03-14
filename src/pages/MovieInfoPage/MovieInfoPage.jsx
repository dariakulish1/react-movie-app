import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import './MovieInfoPage.scss';
import serverImg from '../../images/posterimg.jpg';
import trailer1 from '../../images/trailer1.png';
import trailer2 from '../../images/trailer2.png';
import { CastBox } from '../../components/CastBox';

const propTypes = {
  movieid: PropTypes.number.isRequired,
};
export const MovieInfoPage = ({ movieid }) => {
  // const { movieid } = useParams();
  return (
    <div className="info-box container">
      <div className="info-box__back-case">
        <Link
          className="info-box__back-botton"
          to="#"
          onClick={() => window.history.back()}
        >
          &#60; Back
        </Link>
      </div>
      <div className="info-box__general-info">
        <div className="info-box__film-poster-box">
          <img
            className="info-box__film-poster"
            src={serverImg}
            alt="serverImage"
          />
        </div>
        <div className="info-box__detailed-info">
          <p className="info-box__server-movie-name">Judy</p>
          <p className="info-box__small-title">Judy</p>
          <p className="info-box__server-movie-rating">
            Rating: <span className="info-box__span-num">8.0</span>
          </p>
          <p className="info-box__server-data-release">
            Release data:
            <span className="info-box__span-data">20 June 2022</span>
          </p>
          <p className="info-box__server-genres-info">
            Genre:
            <span className="info-box__span-genres">
              Genre 1, genre 2, genre 3
            </span>
          </p>
          <p className="info-box__server-runtime-info">
            Runtime:
            <span className="info-box__span-runtime">90 minutes</span>
          </p>
          <div className="info-box__buttons-box">
            <hr />
            <div className="info-box__two-buttons-container">
              <button type="button" className="info-box__button-to-watch">
                &#9658; Watch movie
              </button>
              <button type="button" className="info-box__button-to-add-to-fav">
                Add to favorite
              </button>
            </div>
          </div>
          <div className="info-box__film-description">
            <hr />
            <p className="info-box__description-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
              optio sint veniam porro, unde eligendi possimus? Accusantium fuga
              reiciendis inventore quibusdam dolor dolores perferendis maiores
              magnam quidem. Vitae, earum dolore.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <p className="info-box__trailers-title">Trailers</p>
      <div className="info-box__trailer-video">
        <div className="info-box__video-with-title">
          <img
            className="info-box__server-trailer-video"
            src={trailer1}
            alt="trailer-1"
          />
          <p className="info-box__official-trailer-title">Official trailer 1</p>
        </div>
        <div className="info-box__video-with-title">
          <img
            className="info-box__server-trailer-video"
            src={trailer2}
            alt="trailer-2"
          />
          <p className="info-box__official-trailer-title">Official trailer 2</p>
        </div>
      </div>
      <hr />
      <p className="info-box__cast-title">Cast</p>
      <div className="info-box__cast-case">
        <CastBox />
        <CastBox />
        <CastBox />
        <CastBox />
        <CastBox />
        <CastBox />
        <CastBox />
        <CastBox />
        <CastBox />
      </div>
    </div>
  );
};

MovieInfoPage.propTypes = propTypes;

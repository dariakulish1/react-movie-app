import './CastBox.scss';
import { ThreeCircles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import actorphoto from '../../images/actorphoto.png';
import unnamed from '../../images/unnamed.png';
import { headers } from '../../utils/headers';
import { Spinner } from '../Spinner/Spinner';

export const CastBox = () => {
  const { movieid } = useParams();
  const [data, setData] = useState([]);
  const promise = fetch(`movie/${movieid}`);
  const [iserror, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        headers,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,
      { headers },
    )
      .then((response) => response.json())
      .then((data) => setData(data.cast))
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);
  promise
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(Error('Error'));
      }
      return response.json();
    })
    .then((data) => {
      setLoading(false);
      setData(data.results);
    })
    .catch((err) => {
      setError(false);
      console.error(err);
    });
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (iserror) {
    return <div>Sorry, it is error</div>;
  }
  return (
    <div className="info-cast-box">
      {data.map(({ character, name, profile_path }) => {
        return (
          <div className="info-cast-box__all-cast-info">
            <img
              className="info-cast-box__actor-photo"
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w185/${profile_path}`
                  : unnamed
              }
              alt="actor"
            />
            <div className="info-cast-box__info-about-actor">
              <p className="info-cast-box__actors-name">{name}</p>
              <p className="info-cast-box__actors-role">{character}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import './CastBox.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import actorphoto from '../../images/actorphoto.png';
import unnamed from '../../images/unnamed.png';

export const CastBox = ({}) => {
  const { movieid } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzJjNDU3N2FiNWY1MDAwMWRlNTBlMmQzYWVlMDgxMyIsInN1YiI6IjY1ZDQ2OGZiMDlkZGE0MDE4ODU4MDYzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qg910gKgtA4qwRkHbQFWbYQLbpPR5H7vR9sO3rtqkMM',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,
      options,
    )
      .then((response) => response.json())
      .then((data) => setData(data.cast))
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);
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

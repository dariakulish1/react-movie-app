import './CastBox.scss';
import actorphoto from '../../images/actorphoto.png';

export const CastBox = () => {
  return (
    <div className="info-cast-box">
      <img
        className="info-cast-box__actor-photo"
        src={actorphoto}
        alt="actor"
      />
      <div className="info-cast-box__info-about-actor">
        <p className="info-cast-box__actors-name">Cillian Murphy</p>
        <p className="info-cast-box__actors-role">J. Robert Oppenheimer</p>
      </div>
    </div>
  );
};

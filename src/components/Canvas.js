import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'auth0-web';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
// import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
// import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import Leaderboard from './Leaderboard';
import { gameHeight } from '../utils/constants';

const Canvas = props => {
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight
  ];

  const leaderboard = [
    {
      id: 'd4',
      maxScore: 82,
      name: 'Ado Kukic',
      picture: 'https://twitter.com/KukicAdo/profile_image'
    },
    {
      id: 'a1',
      maxScore: 235,
      name: 'Bruno Krebs',
      picture: 'https://twitter.com/brunoskrebs/profile_image'
    },
    {
      id: 'c3',
      maxScore: 99,
      name: 'Diego Poza',
      picture: 'https://twitter.com/diegopoza/profile_image'
    },
    {
      id: 'b2',
      maxScore: 129,
      name: 'Jeana Tahnk',
      picture: 'https://twitter.com/jeanatahnk/profile_image'
    },
    {
      id: 'e5',
      maxScore: 34,
      name: 'Jenny Obrien',
      picture: 'https://twitter.com/jenny_obrien/profile_image'
    },
    {
      id: 'f6',
      maxScore: 153,
      name: 'Kim Maida',
      picture: 'https://twitter.com/KimMaida/profile_image'
    },
    {
      id: 'g7',
      maxScore: 55,
      name: 'Luke Oliff',
      picture: 'https://twitter.com/mroliff/profile_image'
    },
    {
      id: 'h8',
      maxScore: 146,
      name: 'Sebastián Peyrott',
      picture: 'https://twitter.com/speyrott/profile_image'
    }
  ];

  return (
    <svg
      id="aliens-go-home"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
      onMouseMove={props.trackMouse}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>

      <Sky />
      <Ground />
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={0} />

      {props.gameState.started ? (
        props.gameState.flyingObjects.map(({ id, position }) => (
          <FlyingObject key={id} position={position} />
        ))
      ) : (
        <g>
          <StartGame onClick={() => props.startGame()} />
          <Title />
          <Leaderboard
            currentPlayer={leaderboard[6]}
            authenticate={signIn}
            leaderboard={leaderboard}
          />
        </g>
      )}
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired
};

export default Canvas;

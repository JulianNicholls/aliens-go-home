import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'auth0-web';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import Leaderboard from './Leaderboard';
import { gameHeight } from '../utils/constants';

const Canvas = ({
  angle,
  trackMouse,
  gameState,
  currentPlayer,
  players,
  startGame,
  shoot,
}) => {
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight,
  ];

  const lives = [];
  for (let i = 0; i < gameState.lives; ++i) {
    const position = {
      x: -180 - i * 70,
      y: 35,
    };

    lives.push(<Heart key={i} position={position} />);
  }
  return (
    <svg
      id="aliens-go-home"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
      onMouseMove={trackMouse}
      onClick={shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>

      <Sky />
      <Ground />

      {gameState.cannonballs.map(ball => (
        <CannonBall key={ball.id} position={ball.position} />
      ))}

      <CannonPipe rotation={angle} />
      <CannonBase />
      <CurrentScore score={gameState.kills} />

      {gameState.started ? (
        gameState.flyingObjects.map(({ id, position }) => (
          <FlyingObject key={id} position={position} />
        ))
      ) : (
        <g>
          <StartGame onClick={() => startGame()} />
          <Title />
          <Leaderboard
            currentPlayer={currentPlayer}
            authenticate={signIn}
            leaderboard={players}
          />
        </g>
      )}

      {lives}
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
          y: PropTypes.number.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })
  ).isRequired,
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
};

export default Canvas;

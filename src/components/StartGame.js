import React from 'react';
import PropTypes from 'prop-types';
import { gameWidth } from '../utils/constants';

const StartGame = ({ onClick }) => {
  const button = {
    x: gameWidth / -2,
    y: -200,
    width: gameWidth,
    height: 200,
    rx: 10,
    ry: 10,
    style: {
      fill: 'transparent',
      cursor: 'pointer',
    },
    onClick,
  };

  const text = {
    textAnchor: 'middle',
    x: 0,
    y: -150,
    style: {
      fontFamily: '"Joti One", cursive',
      fontSize: 60,
      fill: '#e3e3e3',
      cursor: 'pointer',
    },
    onClick,
  };

  return (
    <g filter="url(#shadow)">
      <rect {...button} />
      <text {...text}>Tap to Start</text>
    </g>
  );
};

StartGame.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StartGame;

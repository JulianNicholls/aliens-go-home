import React from 'react';

import { gameWidth } from '../utils/constants';

const Sky = () => {
  const style = {
    fill: '#30abef'
  };

  const gameHeight = 1200;

  return (
    <rect
      style={style}
      x={gameWidth / -2}
      y={100 - gameHeight}
      width={gameWidth}
      height={gameHeight}
    />
  );
};

export default Sky;

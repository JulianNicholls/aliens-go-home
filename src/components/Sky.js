import React from 'react';

import { skyAndGroundWidth, gameHeight } from '../utils/constants';

const Sky = () => {
  const style = {
    fill: '#30abef'
  };

  return (
    <rect
      style={style}
      x={skyAndGroundWidth / -2}
      y={100 - gameHeight}
      width={skyAndGroundWidth}
      height={gameHeight}
    />
  );
};

export default Sky;

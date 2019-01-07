import React from 'react';

const Sky = () => {
  const style = {
    fill: '#30abef'
  };

  const width = 5000;
  const gameHeight = 1200;

  return (
    <rect
      style={style}
      x={width / -2}
      y={100 - gameHeight}
      width={width}
      height={gameHeight}
    />
  );
};

export default Sky;

import React from 'react';
import PropTypes from 'prop-types';

const CannonBall = ({ position: { x, y } }) => {
  const style = {
    fill: '#555',
    stroke: '#333',
    strokeWidth: '2px',
  };

  return <ellipse style={style} cx={x} cy={y} rx={16} ry={16} />;
};

CannonBall.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default CannonBall;

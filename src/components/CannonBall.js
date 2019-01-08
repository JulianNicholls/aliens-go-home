import React from 'react';
import PropTypes from 'prop-types';

const CannonBall = props => {
  const style = {
    fill: '#555',
    stroke: '#333',
    strokeWidth: '2px'
  };

  const { x, y } = props.position;

  return <ellipse style={style} cx={x} cy={y} rx={16} ry={16} />;
};

CannonBall.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};
export default CannonBall;

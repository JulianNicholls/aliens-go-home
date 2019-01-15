import React from 'react';
import PropTypes from 'prop-types';

const FlyingObjectBase = ({ position: { x, y } }) => {
  const style = {
    fill: '#979797',
    stroke: '#5c5c5c',
  };

  return <ellipse style={style} cx={x} cy={y} rx={40} ry={10} />;
};

FlyingObjectBase.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default FlyingObjectBase;

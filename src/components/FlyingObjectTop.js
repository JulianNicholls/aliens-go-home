import React from 'react';
import PropTypes from 'prop-types';
import { pathFromBezierCurve } from '../utils/formulas';

const FlyingObjectTop = ({ position: { x, y } }) => {
  const style = {
    fill: '#b6b6b6',
    stroke: '#7d7d7d',
  };

  const width = 40;
  const halfBase = 20;
  const height = 25;

  const cubicBezierCurve = {
    initialAxis: { x: x - halfBase, y },
    initialControlPoint: { x: 10, y: -height },
    endingControlPoint: { x: 30, y: -height },
    endingAxis: { x: width, y: 0 },
  };

  return <path style={style} d={pathFromBezierCurve(cubicBezierCurve)} />;
};

FlyingObjectTop.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default FlyingObjectTop;

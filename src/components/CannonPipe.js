import React from 'react';
import PropTypes from 'prop-types';

import { pathFromBezierCurve } from '../utils/formulas';

const CannonPipe = props => {
  const style = {
    fill: '#777',
    stroke: '#555',
    strokeWidth: '2px'
  };

  const transform = `rotate(${props.rotation}, 0, 0)`;

  const width = 40;
  const halfWidth = 20;
  const height = 100;
  const yBasis = 70;

  const cubicBezierCurve = {
    initialAxis: { x: -halfWidth, y: -yBasis },
    initialControlPoint: { x: -40, y: height * 1.7 },
    endingControlPoint: { x: 80, y: height * 1.7 },
    endingAxis: { x: width, y: 0 }
  };

  return (
    <g transform={transform}>
      <path style={style} d={pathFromBezierCurve(cubicBezierCurve)} />
      <line
        x1={-halfWidth}
        y1={-yBasis}
        x2={halfWidth}
        y2={-yBasis}
        style={style}
      />
    </g>
  );
};

CannonPipe.propTypes = {
  rotation: PropTypes.number.isRequired
};

export default CannonPipe;

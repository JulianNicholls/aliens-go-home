import React from 'react';

import { pathFromBezierCurve } from '../utils/formulas';

const CannonBase = () => {
  const style = {
    fill: '#a16012',
    stroke: '#75450e',
    strokeWidth: '2px'
  };

  const width = 80;
  const halfBase = 40;
  const height = 60;
  const negHeight = -height;

  const cubicBezierCurve = {
    initialAxis: { x: -halfBase, y: height },
    initialControlPoint: { x: 20, y: negHeight },
    endingControlPoint: { x: 60, y: negHeight },
    endingAxis: { x: width, y: 0 }
  };

  return (
    <g>
      <path style={style} d={pathFromBezierCurve(cubicBezierCurve)} />
      <line x1={-halfBase} y1={height} x2={halfBase} y2={height} style={style} />
    </g>
  );
};

export default CannonBase;

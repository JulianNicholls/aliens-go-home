export const radiansToDegrees = rad => (rad * 180) / Math.PI;
export const degreesToRadians = deg => (deg * Math.PI) / 180;

export const pathFromBezierCurve = cubicBezierCurve => {
  const {
    initialAxis: ia,
    initialControlPoint: icp,
    endingControlPoint: ecp,
    endingAxis: ea
  } = cubicBezierCurve;

  return `M${ia.x} ${ia.y} c ${icp.x} ${icp.y} ${ecp.x} ${ecp.y} ${ea.x} ${ea.y}`;
};

export const calculateAngle = (x1, y1, x2, y2) => {
  if (x2 >= 0 && y2 >= 0) {
    return 90;
  } else if (x2 < 0 && y2 >= 0) {
    return -90;
  }

  const dividend = x2 - x1;
  const divisor = y2 - y1;
  const quotient = dividend / divisor;
  return radiansToDegrees(Math.atan(quotient)) * -1;
};

export const getCanvasPosition = event => {
  const svg = document.getElementById('aliens-go-home');
  const point = svg.createSVGPoint();

  point.x = event.clientX;
  point.y = event.clientY;

  const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());

  return { x, y };
};

export const calculateNextPosition = (x, y, angle, divisor = 300) => {
  const realAngle = degreesToRadians(90 - angle);
  const stepsX = radiansToDegrees(Math.cos(realAngle)) / divisor;
  const stepsY = radiansToDegrees(Math.sin(realAngle)) / divisor;

  return {
    x: x + stepsX,
    y: y - stepsY
  };
};

export const checkCollision = (rectA, rectB) =>
  rectA.x1 < rectB.x2 &&
  rectA.x2 > rectB.x1 &&
  rectA.y1 < rectB.y2 &&
  rectA.y2 > rectB.y1;

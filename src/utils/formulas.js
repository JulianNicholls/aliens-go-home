export const pathFromBezierCurve = cubicBezierCurve => {
  const {
    initialAxis: ia,
    initialControlPoint: icp,
    endingControlPoint: ecp,
    endingAxis: ea
  } = cubicBezierCurve;

  return `M${ia.x} ${ia.y} c ${icp.x} ${icp.y} ${ecp.x} ${ecp.y} ${ea.x} ${ea.y}`;
};

import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonballs';

export default (state, action) => {
  if (!state.gameState.started) return state;

  let cannonballs = moveBalls(state.gameState.cannonballs);

  const mousePosition = action.mousePosition || { x: 0, y: 0 };

  const newState = createFlyingObjects(state);

  const now = new Date().getTime();
  const flyingObjects = newState.gameState.flyingObjects.filter(
    ({ createdAt }) => now - createdAt < 4000
  );

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonballs
    },
    angle
  };
};

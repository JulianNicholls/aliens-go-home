import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonballs';
import checkCollisions from './checkCollisions';

export default (state, action) => {
  if (!state.gameState.started) return state;

  let cannonballs = moveBalls(state.gameState.cannonballs);

  const mousePosition = action.mousePosition || { x: 0, y: 0 };

  const newState = createFlyingObjects(state);

  const now = new Date().getTime();
  let flyingObjects = newState.gameState.flyingObjects.filter(
    ({ createdAt }) => now - createdAt < 4000
  );

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const destroyed = checkCollisions(cannonballs, flyingObjects);
  const ballsDestroyed = destroyed.map(({ ballID }) => ballID);
  const discsDestroyed = destroyed.map(({ discID }) => discID);

  cannonballs = cannonballs.filter(ball => ballsDestroyed.indexOf(ball.id));
  flyingObjects = flyingObjects.filter(disc => discsDestroyed.indexOf(disc.id));

  const kills = state.gameState.kills + discsDestroyed.length;

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

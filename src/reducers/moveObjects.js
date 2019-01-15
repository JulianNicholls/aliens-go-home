import { DROP_TIME } from '../utils/constants';
import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonballs';
import checkCollisions from './checkCollisions';

export default (state, action) => {
  const { gameState } = state;

  if (!gameState.started) return state;

  let cannonballs = moveBalls(gameState.cannonballs);

  const mousePosition = action.mousePosition || { x: 0, y: 0 };

  const newState = createFlyingObjects(state);

  const now = new Date().getTime();
  let ufos = newState.gameState.flyingObjects.filter(
    ({ createdAt }) => now - createdAt < DROP_TIME
  );

  const lostLife = gameState.flyingObjects.length > ufos.length;
  let { lives } = gameState;
  if (lostLife) --lives;

  const started = lives > 0;
  if (!started) {
    ufos = [];
    cannonballs = [];
    lives = 5;
  }

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const destroyed = checkCollisions(cannonballs, ufos);
  const ballsDestroyed = destroyed.map(({ ballID }) => ballID);
  const ufosDestroyed = destroyed.map(({ discID }) => discID);

  cannonballs = cannonballs.filter(ball => ballsDestroyed.indexOf(ball.id));
  ufos = ufos.filter(ufo => ufosDestroyed.indexOf(ufo.id));

  const kills = gameState.kills + ufosDestroyed.length;

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects: ufos,
      cannonballs: [...cannonballs],
      lives,
      started,
      kills,
    },
    angle,
  };
};

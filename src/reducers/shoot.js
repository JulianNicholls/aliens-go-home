import { MAX_CANNONBALLS } from '../utils/constants';
import { calculateAngle } from '../utils/formulas';

export default (state, action) => {
  if (!state.gameState.started) return state;

  const { cannonballs } = state.gameState;

  if (cannonballs.length === MAX_CANNONBALLS) return state;

  const { x, y } = action.mousePosition;
  const angle = calculateAngle(0, 0, x, y);
  const id = new Date().getTime();
  const cannonBall = {
    position: { x: 0, y: 0 },
    angle,
    id,
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonballs: [...cannonballs, cannonBall],
    },
  };
};

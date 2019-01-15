import { MAX_CANNONBALLS } from '../utils/constants';
import { angleTo } from '../utils/formulas';

export default (state, action) => {
  if (!state.gameState.started) return state;

  const { cannonballs } = state.gameState;

  if (cannonballs.length === MAX_CANNONBALLS) return state;

  const { x, y } = action.mousePosition;
  const angle = angleTo(0, 0, x, y);
  const id = new Date().getTime();
  const newBall = {
    position: { x: 0, y: 0 },
    angle,
    id,
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonballs: [...cannonballs, newBall],
    },
  };
};

import { calculateAngle } from '../utils/formulas';

export default (state, action) => {
  if (!state.gameState.started) return state;

  const { cannonballs } = state.gameState;

  if (cannonballs.length === 2) return state;

  const { x, y } = action.mousePosition;
  const angle = calculateAngle(0, 0, x, y);
  const id = new Date().getTime();
  const cannonBall = {
    position: { x: 0, y: 0 },
    angle,
    id
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonballs: [...cannonballs, cannonBall]
    }
  };
};

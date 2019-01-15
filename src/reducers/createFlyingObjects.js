import {
  createInterval,
  UFOStartY,
  UFOStarterPositions,
  maxUFOs,
} from '../utils/constants';

export default state => {
  if (!state.gameState.started) return state;

  const now = new Date().getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject =
    now - lastObjectCreatedAt.getTime() > createInterval &&
    flyingObjects.length < maxUFOs;

  if (!createNewObject) return state;

  const id = now;
  const newPosition = Math.floor(Math.random() * UFOStarterPositions.length);
  const xPosition = UFOStarterPositions[newPosition];
  const newFlyingObject = {
    position: {
      x: xPosition,
      y: UFOStartY,
    },
    createdAt: new Date().getTime(),
    id,
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [...state.gameState.flyingObjects, newFlyingObject],
      lastObjectCreatedAt: new Date(),
    },
  };
};

import {
  createInterval,
  flyingObjectsStarterYAxis,
  flyingObjectsStarterPositions,
  maxFlyingObjects
} from '../utils/constants';

export default state => {
  if (!state.gameState.started) return state;

  const now = new Date().getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject =
    now - lastObjectCreatedAt.getTime() > createInterval &&
    flyingObjects.length < maxFlyingObjects;

  if (!createNewObject) return state;

  const id = now;
  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
  const xPosition = flyingObjectsStarterPositions[predefinedPosition];
  const newFlyingObject = {
    position: {
      x: xPosition,
      y: flyingObjectsStarterYAxis
    },
    createdAt: new Date().getTime(),
    id
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [...state.gameState.flyingObjects, newFlyingObject],
      lastObjectCreatedAt: new Date()
    }
  };
};

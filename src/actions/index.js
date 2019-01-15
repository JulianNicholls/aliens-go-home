import {
  MOVE_OBJECTS,
  START_GAME,
  LEADERBOARD_LOADED,
  LOGGED_IN,
  SHOOT,
} from './types';

export const moveObjects = mousePosition => ({
  type: MOVE_OBJECTS,
  mousePosition,
});

export const startGame = () => ({ type: START_GAME });

export const leaderboardLoaded = players => ({
  type: LEADERBOARD_LOADED,
  players,
});

export const loggedIn = player => ({ type: LOGGED_IN, player });

export const shoot = mousePosition => ({ type: SHOOT, mousePosition });

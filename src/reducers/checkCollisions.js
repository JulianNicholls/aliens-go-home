import { gameHeight, DROP_TIME } from '../utils/constants';
import { checkCollision } from '../utils/formulas';

const checkCollisions = (cannonballs, ufos) => {
  const destroyed = [];

  ufos.forEach(disc => {
    const lifeTime = new Date().getTime() - disc.createdAt;
    const position = {
      x: disc.position.x,
      y: disc.position.y + (lifeTime / DROP_TIME) * gameHeight,
    };

    const rectA = {
      x1: position.x - 40,
      y1: position.y - 10,
      x2: position.x + 40,
      y2: position.y + 10,
    };

    cannonballs.forEach(ball => {
      const rectB = {
        x1: ball.position.x - 8,
        y1: ball.position.y - 8,
        x2: ball.position.x + 8,
        y2: ball.position.y + 8,
      };

      if (checkCollision(rectA, rectB)) {
        destroyed.push({
          ballID: ball.id,
          discID: disc.id,
        });
      }
    });
  });

  return destroyed;
};

export default checkCollisions;

import { nextPosition } from '../utils/formulas';

export default balls =>
  balls
    .filter(
      ball =>
        ball.position.y > -800 && ball.position.x > -500 && ball.position.x < 500
    )
    .map(ball => {
      const {
        angle,
        position: { x, y },
      } = ball;

      return { ...ball, position: nextPosition(x, y, angle, 5) };
    });

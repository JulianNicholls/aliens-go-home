import { connect } from 'react-redux';

import App from '../App';
// import { moveObjects, startGame } from '../actions';
import * as actions from '../actions';

const mapStateToProps = state => ({
  angle: state.angle,
  gameState: state.gameState
});

// const mapDispatchToProps = dispatch => ({
//   moveObjects: mousePosition => {
//     dispatch(moveObjects(mousePosition));
//   },
//   startGame: () => {
//     dispatch(startGame());
//   }
// });

export default connect(
  mapStateToProps,
  actions
)(App);

import { connect } from 'react-redux';

import App from '../App';
import * as actions from '../actions';

const mapStateToProps = state => ({
  angle: state.angle,
  gameState: state.gameState,
  currentPlayer: state.currentPlayer,
  players: state.players
});

export default connect(
  mapStateToProps,
  actions
)(App);

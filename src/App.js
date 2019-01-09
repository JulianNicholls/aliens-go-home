import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Auth0 from 'auth0-web';

import Canvas from './components/Canvas';
import { getCanvasPosition } from './utils/formulas';

Auth0.configure({
  domain: process.env.REACT_APP_CLIENT_DOMAIN,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points'
});

class App extends Component {
  componentDidMount() {
    const self = this;

    Auth0.handleAuthCallback();

    Auth0.subscribe(auth => console.log('Logged in:', auth));

    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 16);

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home');

      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };

    window.onresize();
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    const { angle, gameState, startGame } = this.props;

    return (
      <Canvas
        angle={angle}
        trackMouse={event => this.trackMouse(event)}
        gameState={gameState}
        startGame={startGame}
      />
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};

export default App;

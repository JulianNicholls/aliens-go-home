import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Auth0 from 'auth0-web';
import io from 'socket.io-client';

import Canvas from './components/Canvas';
import { getCanvasPosition } from './utils/formulas';

Auth0.configure({
  domain: process.env.REACT_APP_CLIENT_DOMAIN,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
  audience: 'http://aliens.reallybigshoe.co.uk'
});

class App extends Component {
  componentDidMount() {
    const self = this;

    Auth0.handleAuthCallback();

    Auth0.subscribe(auth => {
      if (!auth) {
        console.log('Not Logged in');
        return;
      }

      const profile = Auth0.getProfile();
      const currentPlayer = {
        id: profile.sub,
        maxScore: 0,
        name: profile.name,
        picture: profile.picture
      };

      this.props.loggedIn(currentPlayer);

      const socket = io('http://localhost:3001', {
        query: `token=${Auth0.getAccessToken()}`
      });

      let emitted = false;

      socket.on('players', players => {
        this.props.leaderboardLoaded(players);

        if (emitted) return;

        socket.emit('new-max-score', {
          id: profile.sub,
          maxScore: 120,
          name: profile.name,
          picture: profile.picture
        });

        emitted = true;

        setTimeout(() => {
          socket.emit('new-max-score', {
            id: profile.sub,
            maxScore: 222,
            name: profile.name,
            picture: profile.picture
          });
        }, 5000);
      });
    });

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
    const { angle, gameState, players, currentPlayer, startGame } = this.props;

    return (
      <Canvas
        angle={angle}
        currentPlayer={currentPlayer}
        gameState={gameState}
        players={players}
        startGame={startGame}
        trackMouse={event => this.trackMouse(event)}
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
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
    })
  ).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired
};

App.defaultProps = {
  currentPlayer: null,
  players: []
};

export default App;

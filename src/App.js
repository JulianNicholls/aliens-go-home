import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Auth0 from 'auth0-web';
import io from 'socket.io-client';

import Canvas from './components/Canvas';
import { canvasPosition } from './utils/formulas';

Auth0.configure({
  domain: process.env.REACT_APP_CLIENT_DOMAIN,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
  audience: 'http://aliens.reallybigshoe.co.uk',
});

class App extends Component {
  socket = null;
  currentPlayer = null;

  componentDidMount() {
    const { loggedIn, leaderboardLoaded, moveObjects } = this.props;
    const self = this;

    Auth0.handleAuthCallback();

    Auth0.subscribe(auth => {
      if (!auth) {
        console.log('Not Logged in');
        return;
      }

      self.profile = Auth0.getProfile();
      self.currentPlayer = {
        id: self.profile.sub,
        maxScore: 0,
        name: self.profile.name,
        picture: self.profile.picture,
      };

      loggedIn(self.currentPlayer);

      self.socket = io('http://localhost:3001', {
        query: `token=${Auth0.getAccessToken()}`,
      });

      self.socket.on('players', players => {
        leaderboardLoaded(players);

        players.forEach(player => {
          if (player.id === self.currentPlayer.id) {
            self.currentPlayer.maxScore = player.maxScore;
          }
        });
      });
    });

    setInterval(() => {
      moveObjects(self.canvasMousePosition);
    }, 16);

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home');

      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };

    window.onresize();
  }

  componentWillReceiveProps(nextProps) {
    const { gameState } = this.props;

    if (!nextProps.gameState.started && gameState.started) {
      if (this.currentPlayer.maxScore < gameState.kills) {
        this.socket.emit('new-max-score', {
          ...this.currentPlayer,
          maxScore: gameState.kills,
        });
      }
    }
  }

  trackMouse(event) {
    this.canvasMousePosition = canvasPosition(event);
  }

  shoot = () => {
    this.props.shoot(this.canvasMousePosition);
  };

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
        shoot={this.shoot}
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
          y: PropTypes.number.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      maxScore: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })
  ).isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
};

App.defaultProps = {
  currentPlayer: null,
  players: [],
};

export default App;

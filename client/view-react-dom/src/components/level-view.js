import React from 'react';
import GameView from './game-view.js';
import Dashboard from './dashboard.js';

class LevelView extends React.Component {
  render() {
    return(
      <div>
        <GameView items={ this.props.items } deviceConnected={ this.props.deviceConnected } />
        <Dashboard GazeButtClicked ={ this.props.GazeButtClicked } currentItem={ this.props.currentItem } />
      </div>
    );
  }
};

export default LevelView;

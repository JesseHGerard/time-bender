import React from 'react';
import GameView from './game-view.js';
import Dashboard from './dashboard.js';
import '../App.css';

class LevelView extends React.Component {
  render() {
    return(
      <div className="level-view">
        <GameView items={ this.props.items } deviceConnected={ this.props.deviceConnected } />
        <Dashboard
          GazeButtClicked ={ this.props.GazeButtClicked }
          currentItem={ this.props.currentItem }
          items={ this.props.items }
        />
      </div>
    );
  }
};

export default LevelView;

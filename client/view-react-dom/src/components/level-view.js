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
          startButtonStatus ={ this.props.startButtonStatus }
          currentItem={ this.props.currentItem }
          items={ this.props.items }
          status={ this.props.status}
        />
      </div>
    );
  }
};

export default LevelView;

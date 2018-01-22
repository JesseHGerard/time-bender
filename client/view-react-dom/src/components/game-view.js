import React from 'react';
import FoundItems from './found-items.js';
import '../App.css';

class GameView extends React.Component {

  // CHANGE URL FOR PRODUCTION SERVER!!!!
  //`https://time-bender.herokuapp.com//vr`


  render(){
    let content;
    if (this.props.deviceConnected) {
      content = <FoundItems items={ this.props.items } />;
    } else {
      content =
      <iframe src={ 'http://localhost:3001/vr' } title="vr"></iframe>;
    }
    return (
      <div className="game-view">
        { content }
      </div>
    );
  }
};

export default GameView;
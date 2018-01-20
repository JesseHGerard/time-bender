import React from 'react';
import FoundItems from './found-items.js';

class GameView extends React.Component {
  render(){
    let content;
    if (this.props.deviceConnected) {
      content = <FoundItems items={ this.props.items } />;
    } else {
      content =
      <iframe src={ `${window.location.origin}/vr` }></iframe>;
    }
    return (
      <div>
        { content }
      </div>
    );
  }
};

export default GameView;

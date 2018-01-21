import React from 'react';
import '../App.css';

class Story extends React.Component {

  render() {
    return (
      <div className="story-container">
        <div className="button yellow" onClick={ this.props.onClick }>Level { this.props.level }</div>

      </div>
    );
  }
};

export default Story;

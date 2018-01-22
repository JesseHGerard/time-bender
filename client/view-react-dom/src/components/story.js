import React from 'react';
import '../App.css';

class Story extends React.Component {
  state = {
    1: <p className="story-text blue">Hey, can you hear me?
     Good. I finally got the multi-dimensional transmitter working.<br/><br/>
     So anyway, long story short... I got drunk last night, and well... <span className="yellow">I'm stuck in time.</span> It's fine, I'm a super scientist, these things happen.<br/><br/>
     I need you to visit the places I went last night and <span className="yellow">use the viewer</span> to collect items to rebuild my time machine.Thanks! <span className="yellow">-Dr Ani</span>
     </p>,
    2: <p className="story-text blue">Alright! I'm glad this is working. I wasn't sure if I could freeze your time without making you explode! But I guess it all worked out.<br/><br/>
    I remember the next place I went on my bender. I'll send it to your viewer now.</p>,
    3: <p className="story-text blue">Just one more stop. Could you hurry it up? All I've had to eat is the gum I could scrape off from under the bar...'</p>
  };

  render() {  

    return (
      <div className="story-container">
        <div>
          <h1 className="title yellow">{ this.props.level }</h1>
            { this.state[this.props.level] }
        </div>
        <div className="button yellow" onClick={ this.props.onClick }>Level { this.props.level }</div>

      </div>
    );
  }
};

export default Story;

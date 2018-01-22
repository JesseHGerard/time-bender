import React, { Component } from 'react';
import LevelView from './components/level-view.js';
import Welcome from './components/welcome.js';
import Story from './components/story.js';
import './App.css';
import io from 'socket.io-client';
const socket = io(window.location.origin);

class App extends Component {

  state = {
    welcome: true,
    room: null,
    deviceConnected: false,

    level: 0,
    status: 'stopped', // string, can be 'stopped' or 'started'
    GazeButtClicked: false, // boolean, this means vr game is in 'resting' state if false

    currentItem: 0,
    items: [
      {
        "title": 0,
        "source": ["Platform.obj", ""],
        "texture": "Black_nor.jpg",
        "translate": [5, -25, -20],
        "scale": 0.10,
        "rotate": [0, 0, 0],
        "found": false,
        "image": "./images/url.jpg",
      },
      {
        "title": 1,
        "source": ["dna.obj", ""],
        "texture": "Black_nor.jpg",
        "translate": [-2.8, 1.2, -5],
        "scale": 0.025,
        "rotate": [0, 0, 0],
        "found": true,
        "image": "images/golf.svg",
      },
      {
        "title": 2,
        "source": ["Platform.obj", ""],
        "texture": "Black_nor.jpg",
        "translate": [5, -25, -20],
        "scale": 0.10,
        "rotate": [0, 0, 0],
        "found": false,
        "image": "images/hydrant.svg",
      },
      {
        "title": 3,
        "source": ["Platform.obj", ""],
        "texture": "Black_nor.jpg",
        "translate": [5, -25, -20],
        "scale": 0.10,
        "rotate": [0, 0, 0],
        "found": false,
        "image": "images/hoody.svg",
      },
    ]
  }

  emitState = () => {
    this.setState({deviceConnected: true}, () => {
      socket.emit('updateState', this.state);
      console.log(`emitted: ${this.state}`);
    });
  }

  goFullscreen = () => {
    const element = document.body;
    const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen ||  element.mozRequestFullScreen || element.msRequestFullScreen;
    requestMethod.call(element);
  };

  handleOneDevice = () => {
    this.setState({welcome: false});
    this.goFullscreen();
  };

  handleTwoDevice = () => {
    this.setState({welcome: false, deviceConnected: true});
    this.goFullscreen();
  };

  handleAdvanceLevel = () => {
    this.setState({
      level: this.state.level + 1,
      currentItem: 1,
      GazeButtClicked: false
    }, () => {
      socket.emit('updateState', {
        level: this.state.level,
        currentItem: this.state.currentItem,
        GazeButtClicked: this.state.GazeButtClicked
      })
      console.log(`RD emitted state:
        level: ${this.state.level},
        currentItem: ${this.state.currentItem},
        GazeButtClicked: ${this.state.GazeButtClicked}
      `)
    });
  };

  render() {

    let mainView;
    if (this.state.welcome) {
      mainView =
        <Welcome
          handleOneDevice={ this.handleOneDevice }
          handleTwoDevice={ this.handleTwoDevice }
        />;
    } else {
      mainView =
        <LevelView
          items={ this.state.items }
          deviceConnected={ this.state.deviceConnected }
          currentItem={  this.state.currentItem }
          GazeButtClicked={ this.state.GazeButtClicked }
        />;
    }

    let storyView;
    if (this.state.status === 'stopped' && !this.state.welcome) {
      let storyViewElement = <Story level={ this.state.level + 1 } onClick={ this.handleAdvanceLevel } />;
      if ( this.state.GazeButtClicked ) {
        storyView = storyViewElement;
      } else if ( !this.state.GazeButtClicked && this.state.level === 0) {
        console.log('showing intro story')
        storyView = storyViewElement;
      }
    }

    return (
      <div>
        { mainView }
        { storyView }
      </div>
    );
  }

  componentDidMount() {

    socket.on('joinInvite', nextRoom => {
      if (this.state.room === null) {
        this.setState({room: nextRoom}, () => {
          socket.emit('newRoom',
            {room: this.state.room, client: "rd"})
          console.log(`RD joining room: ${this.state.room}`);
        });
      }
      socket.on('updateState', nextState => {
        this.setState(nextState);
        console.log(`RD received state: ${JSON.stringify(nextState)}`);
      });
    });
  }

}

export default App;

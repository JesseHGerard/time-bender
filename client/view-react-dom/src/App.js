import React, { Component } from 'react';
import LevelView from './components/level-view.js';
import Welcome from './components/welcome.js';
import './App.css';
import io from 'socket.io-client';
const socket = io(window.location.origin);

class App extends Component {

  state = {
    welcome: true,
    room: Date.now(),
    deviceConnected: false,

    level: 1, // number (number is perfered so that it's incrementable)
    status: 'stopped', // string, can be 'stopped' or 'started'
    GazeButtClicked: false, // boolean, this means vr game is in 'resting' state

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

  handleOneDevice = () => {
    this.setState({welcome: false});
  };

  handleTwoDevice = () => {
    this.setState({welcome: false, deviceConnected: true});
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

    return (
      <div>
        { mainView }
      </div>
    );
  }

  componentDidMount() {
    // socket.emit('newRoom', this.state.room);
    socket.emit('updateState', this.state);
    socket.on('updateState', nextState => {
      this.setState(nextState);
      this.forceUpdate();
    });
    console.log(`state ${JSON.stringify(this.state)}`)
  }

}

export default App;

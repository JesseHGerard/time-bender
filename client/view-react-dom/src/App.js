import React, { Component } from 'react';
import LevelView from './components/level-view.js';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = io(window.location.origin);

class App extends Component {

  state = {
    room: Date.now(),
    deviceConnected: true,

    level: 1, // number (number is perfered so that it's incrementable)
    status: 'stopped', // string, can be 'stopped' or 'started'
    GazeButtClicked: false, // boolean, this means vr game is in 'resting' state

    currentItem: 1,
    items: null, // array from items1.json
  };

  emitState = () => {
    this.setState({deviceConnected: true}, () => {
      socket.emit('updateState', this.state);
      console.log(`emitted: ${this.state}`);
    });
  }

  render() {
    return (
      <LevelView
        items={ this.state.items }
        deviceConnected={ this.state.deviceConnected }
        currentItem={  this.state.currentItem }
        GazeButtClicked={ this.state.GazeButtClicked }
      />
    );
  }

  componentDidMount() {
    // socket.emit('newRoom', this.state.room);
    socket.emit('updateState', this.state);
    socket.on('updateState', nextState => {
      console.log(nextState);
    });
    console.log(`state ${JSON.stringify(this.state)}`)
  }

}

export default App;

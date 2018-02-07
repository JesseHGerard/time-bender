import React, { Component } from 'react';
import LevelView from './components/level-view.js';
import Welcome from './components/welcome.js';
import Story from './components/story.js';
import './App.css';
import io from 'socket.io-client';
const socket = io('http://localhost:3001/');

class App extends Component {

  state = {
    welcome: true,
    // room: Date.now(),
    room: 12341234,
    deviceConnected: false,

    level: 0,
    status: 'stopped', // string, can be 'stopped' or 'started'
    startButtonStatus: false, // boolean, this means vr game is in 'resting' state if false

    currentItem: 0,
  }

  // currently not used
  /*
  emitState = () => {
    this.setState({ deviceConnected: true }, () => {
      socket.emit('updateState', this.state);
      console.log(`emitted: ${this.state}`);
    });
  }*/

  goFullscreen = () => {
    const element = document.body;
    const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen ||  element.mozRequestFullScreen || element.msRequestFullScreen;
    requestMethod.call(element);
  }

  handleOneDevice = () => {
    this.setState({
      welcome: false,
      deviceConnected: false
    });
    this.goFullscreen();
  }

  handleTwoDevice = () => {
    this.setState({
      welcome: false,
      deviceConnected: true
    });
    this.goFullscreen();
  }

  handleAdvanceLevel = () => {
    this.setState({
      level: this.state.level + 1,
      currentItem: 1,
      startButtonStatus: false
    }, () => {
      socket.emit('updateState', {
        level: this.state.level,
        currentItem: this.state.currentItem,
        startButtonStatus: this.state.startButtonStatus,
        deviceConnectd: this.state.deviceConnectd,
      })
      console.log(`RD emitted state:
        level: ${this.state.level},
        currentItem: ${this.state.currentItem},
        startButtonStatus: ${this.state.startButtonStatus}
      `);
    });
  }

  emitIncrement = () => {
    socket.emit('updateState', { deviceConnected: this.state.deviceConnected });
    socket.emit('increment');
    console.log(`RD emitted 'increment'`);
  }

  render() {

    let mainView;
    if (this.state.welcome) {
      mainView =
        <Welcome
          room={ this.state.room }
          handleOneDevice={ this.handleOneDevice }
          handleTwoDevice={ this.handleTwoDevice }
        />;
    } else {
      mainView =
        <LevelView
          items={ this.state.items }
          deviceConnected={ this.state.deviceConnected }
          currentItem={  this.state.currentItem }
          startButtonStatus={ this.state.startButtonStatus }
          status={ this.state.status }
          visible={ [this.state.visibleZero, this.state.visibleOne, this.state.visibleTwo] }
          level={ this.state.level }
        />;
    }

    let storyView;
    if (this.state.status === 'stopped' && !this.state.welcome) {
      let storyViewElement = <Story level={ this.state.level + 1 } onClick={ this.emitIncrement } />;
      if ( this.state.startButtonStatus ) {
        storyView = storyViewElement;
      } else if ( !this.state.startButtonStatus && this.state.level === 0) {
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
    socket.emit(
      'joinRoom',
      {room: this.state.room, client: "rd"},
    );
    console.log(`RD joining room: ${this.state.room}`);

    socket.on('updateState', nextState => {
      this.setState(nextState);
      console.log(`RD received ${JSON.stringify(nextState)}`);
    })
  }

}

export default App;

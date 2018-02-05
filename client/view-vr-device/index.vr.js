import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  NativeModules,
  VrButton,
} from 'react-vr';
import io from 'socket.io-client';
import MainPano from './components/main-pano.js';
import LevelButton from './components/level-button.js';

const moduleLocation = NativeModules.WindowModule.pathName;
console.log(moduleLocation.pathname);

export default class view_vr_device extends React.Component {

  state = {
    // room: moduleLocation.pathname.slice(4),
    room: 12341234,
    level: 0,
    start: true,
    currentItem: 0,
    items: null,
  };

  handleLevelClick = () => {
    this.setState({
      start: false,
      currentItem: 1,
     });
  }

  render() {
    let button;
    if (this.state.start) {
      button = <LevelButton text="start" onClick={ this.handleLevelClick } />;
    }

    return (
      <View>
        <MainPano level={ this.state.level }/>
        { button }
      </View>
    );
  }

  componentDidMount() {

    // set socket io url to production or dev
    const ioUrl = () => {
      if (moduleLocation.hostname === 'localhost') {
        return 'http://localhost:3001';
      } else  {
        return moduleLocation.origin;
      }
    }

    const socket = io(ioUrl());

    socket.emit(
      'joinRoom',
      {room: this.state.room, client: "vr"}
    );
    console.log(`VR joining room: ${this.state.room}`);

    socket.on('updateState', nextState => {
      console.log(`received nextState: ${JSON.stringify(nextState)}`);
      this.setState(nextState);
    });
  }

};

AppRegistry.registerComponent('view_vr_device', () => view_vr_device);

import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
  VrHeadModel
} from 'react-vr';
import Button from './components/button.js'
import items1 from "./items1.json";
import io from 'socket.io-client';


// CHANGE URL FOR PRODUCTION !!!!!!
const socket = io('http://localhost:3001/');


export default class view_react_vr extends React.Component {
  state = {
    room: Date.now(),

    level: 0, // number (number is perfered so that it's incrementable)
    status: 'stopped', // string, can be 'stopped' or 'started'
    startButtonStatus: false,

    currentItem: 0,
    items: items1 // array from items1.json
  }

  handleStart = () => {
    let nextState = {
      status: 'started',
      startButtonStatus: true,
      currentItem: 1,
      items: this.state.items
    };
    this.setState(nextState, () => {
      socket.emit('updateState', nextState);
      console.log(`vr emitted: ${JSON.stringify(nextState)}`);
    });

  };

  handleEnd = () => {
    let nextState = {
      status: 'stopped',
      startButtonStatus: true,
      currentItem: this.state.currentItem,
      items: this.state.items
    };
    this.setState(nextState, () => {
      socket.emit('updateState', nextState);
      console.log(`vr emitted: ${JSON.stringify(nextState)}`);
    });
  };

  handleItemBoxClick = () => {

  }

  render() {
    let startButton;
    if (!this.state.startButtonStatus) {
      startButton =
        <Button
          onClick={ this.handleStart }
          title="start"
        />;
    }
    let searchItem =
      <Image
        source={ asset(this.state.items[this.state.currentItem].image)}
        style={{
          transform: [
            {rotateY: VrHeadModel.rotation()[1]}
          ]
        }}
      />;

    let findItemBox =
      <FindItemBox
        onClick={ handleItemBoxClick }
        item={ this.items[currentItem] }
      />




    console.log(`rendered`)
    return (
      <View>
        <Pano source={asset(this.state.items[0].pano)}/>
        { startButton }
        <Button
          onClick={ this.handleEnd }
          title="end"
        />
      </View>
    )
  }

  componentDidMount() {
    socket.emit('newRoom',
      {room: this.state.room, client: 'vr'},
      function(error, message) {
      console.log(`VR joining newRoom: ${message}`);
    });
    socket.on('updateState', nextState => {
      this.setState(nextState);
      console.log(`VR received state: ${JSON.stringify(nextState)}`);
    });
  }

};

AppRegistry.registerComponent('view_react_vr', () => view_react_vr);

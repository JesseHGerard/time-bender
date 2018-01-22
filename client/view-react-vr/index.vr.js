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
import items1 from "./items1.json";
import io from 'socket.io-client';


// CHANGE URL FOR PRODUCTION !!!!!!
const socket = io('http://localhost:3001/');


export default class view_react_vr extends React.Component {
  state = {
    room: Date.now(),

    level: 0, // number (number is perfered so that it's incrementable)
    status: 'stopped', // string, can be 'stopped' or 'started'
    GazeButtClicked: false,

    currentItem: 0,
    items: items1 // array from items1.json
  }

  handleStartClick = () => {
    let nextState = {
      status: 'started',
      GazeButtClicked: true,
      currentItem: 1,
      items: this.state.items
    };
    this.setState({nextState}, () => {
      socket.emit('updateState', nextState);
      console.log(`vr emitted: ${JSON.stringify(nextState)}`);
    })

  };

  handleEndClick = () => {
    let nextState = {
      status: 'stopped',
      GazeButtClicked: true,
      currentItem: this.state.currentItem,
      items: this.state.items
    };
    this.setState({nextState}, () => {
      socket.emit('updateState', nextState);
      console.log(`vr emitted: ${JSON.stringify(nextState)}`);
    })
  };

  render() {
    console.log(this.state.items);
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <VrButton onClick={ this.handleStartClick } >
          <Text
            style={{
              backgroundColor: '#777879',
              fontSize: 0.8,
              fontWeight: '400',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
            }} >
            start
          </Text>
        </VrButton>
        <VrButton onClick={ this.handleEndClick } >
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }} >
          end
        </Text>
      </VrButton>
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

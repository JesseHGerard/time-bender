import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';
import io from 'socket.io-client';

// CHANGE URL FOR PRODUCTION !!!!!!
const socket = io('http://localhost:3001/');

export default class view_react_vr extends React.Component {
  handleClick = () => {
    socket.emit('updateState', this.state);
    console.log(`emitted: ${this.state}`);
  };

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <VrButton onClick={ this.handleClick } >
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
            hello
          </Text>
        </VrButton>
      </View>
    )
  }

  componentDidMount() {
    // socket.emit('newRoom', this.state.room);
    socket.on('updateState', nextState => {
      console.log(nextState);
    });
  }

};

AppRegistry.registerComponent('view_react_vr', () => view_react_vr);

import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import io from 'socket.io-client';

export default class view_react_vr extends React.Component {

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
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
          }}>
          hello
        </Text>
      </View>
    )
  }

  componentDidMount() {
    let url;
    if (process.env.NODE_ENV === production) {
      url = 'https://time-bender.herokuapp.com/';
    } else {
      url = 'http://localhost:3001/';
    };

    let socket = io(url);

    // socket.emit('newRoom', this.state.room);
    socket.emit('updateState', this.state);
    socket.on('updateState', nextState => {
      console.log(nextState);
    });
  }

};

AppRegistry.registerComponent('view_react_vr', () => view_react_vr);

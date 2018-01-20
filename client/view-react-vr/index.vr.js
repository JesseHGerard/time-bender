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
  state = {
    //room: window.location.pathname.replace('/vr/', '').replace('/', '')
  }

  render() {
    console.log(`
      window.location.pathname: ${window.location.pathname}
      window.location.protocol: ${window.location.protocol}
      window.location.host: ${window.location.protocol}
      location: ${JSON.stringify(location)}`);
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
    );
  }

  componentDidMount() {
    let socket = io(`${window.location.origin}`);

    socket.emit('newRoom', this.state.room);
    socket.emit('updateState', 'test');
    socket.on('updateState', nextState => {
      console.log(nextState);
    });
  }

};

AppRegistry.registerComponent('view_react_vr', () => view_react_vr);

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = io(window.location.origin);

class App extends Component {

  state = {
    room: Date.now(),
    deviceConnected: false,

  };

  emitState = () => {
    socket.emit('updateState', this.state);
    console.log(`emitted: ${this.state}`);
  };

  render() {
    return (
      <div className="App">
        { gameView }
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={ this.handleClick }/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
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

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {

  state = {
    room: Date.now()
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
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

}

export default App;

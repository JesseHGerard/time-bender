import React from 'react';
import '../App.css';

class Welcome extends React.Component {
  state = {
    playTwo: false,
  }

  handleClick = () => {
    this.setState({playTwo: true});
  };

  render() {
    let yellow, blue;
    if (this.state.playTwo) {
      blue =
        <div className="blue">
          <img src="https://api.qrserver.com/v1/create-qr-code/?data=http://192.168.1.181:3001/vr&size=200x200" alt="QR Code" />
        </div>;
      yellow =
        <div onClick={ this.props.handleTwoDevice } className="yellow button"><p>start game</p></div>

    } else {
      blue =
        <div onClick={ this.props.handleOneDevice } className="button blue"><p>play with one device</p></div>;
      yellow =
        <div onClick={ this.handleClick } className="yellow button"><p>play with two devices</p></div>
    }

    return (
      <div className="welcome">
        <h1 className="title"><span className="yellow">Time</span> <span className="blue">Bender</span></h1>
        <div className="button-group">
          { blue }
          { yellow }
        </div>
      </div>
    );
  }
};

export default Welcome;

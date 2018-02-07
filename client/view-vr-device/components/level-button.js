import React from 'react';
import {
  Text,
  View,
  VrButton,
} from 'react-vr';
import GazeButton from './gaze-button.js';


export default class LevelButton extends React.Component{

  render() {
    let buttonContent = (
      <Text
        style={{
          backgroundColor: '#777879',
          position: 'absolute',
          fontSize: 0.8,
          fontWeight: '400',
          layoutOrigin: [0.5, 0.5],
          paddingLeft: 0.2,
          paddingRight: 0.2,
          textAlign: 'center',
          textAlignVertical: 'center',
          transform: [{translate: [0, 0, -3]}],
        }}>
        { this.props.text }
      </Text>
    );

    let buttonType;

    if (this.props.deviceConnected) {
      buttonType = (
        <GazeButton onClick={ this.props.onClick } duration={2000}>
          { time => buttonContent }
        </GazeButton>
      );
    } else {
      buttonType = (
        <VrButton onClick={ this.props.onClick }>
          { buttonContent }
        </VrButton>
      );
    }


    return buttonType;
  }
};

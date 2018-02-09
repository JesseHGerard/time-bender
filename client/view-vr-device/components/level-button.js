import React from 'react';
import {
  Image,
  View,
  VrButton,
  asset,
} from 'react-vr';
import GazeButton from './gaze-button.js';


export default class LevelButton extends React.Component{

  render() {
    let buttonContent = (
      <Image
        source={ asset("../images/start.svg") }
        style={{
          position: 'absolute',
          height: 8,
          width: 8,
          transform: [
            {translate: [-4, 4, -10]},
          ],
        }}
      />
    );

    let buttonType;

    if (this.props.deviceConnected) {
      buttonType = (
        <GazeButton onClick={ this.props.onClick } duration={1200}>
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

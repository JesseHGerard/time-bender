import React from 'react';
import {
  Text,
  View,
  VrButton,
} from 'react-vr';

export default class LevelButton extends React.Component{
  render() {
    return (
      <VrButton onClick={ this.props.onClick }>
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
          { this.props.text }
        </Text>
      </VrButton>
    )
  }
};

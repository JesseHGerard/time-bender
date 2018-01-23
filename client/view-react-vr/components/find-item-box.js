import React from 'react';
import {
  VrButton
} from 'react-vr';

class FindItemBox extends React.Component {
  render() {
    return(
      <VrButton onClick= { this.props.onClick }>
        <View style={{
          transform: [
            {rotate: this.props.item.rotate},
            {translate: this.props.item.translate},
            {scale: this.props.item.scale}
          ],
          borderWidth: .25,
          borderColor: "black",
        }} />
      </VrButton>

    );
  }
}

export default FindItemBox;

import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Image,
  VrButton,
  VrHeadModel
} from 'react-vr';

export default class view_react_vr extends React.Component {
  state = {
    rotation: 0,
    showHoody: false,
    showStart: true,
    showHydrant: false,
    showGolf: false,
    showYouWin: false
  };

  handleHoodyClick = () => {
    this.setState({
      rotation: VrHeadModel.rotation()[1],
      showHoody: false,
      showGolf: true
    });
  };

  handleStartClick = () => {
    this.setState({
      showHoody: true,
      showStart: false
    });
  };

  handleGolfClick = () => {
    this.setState({
      rotation: VrHeadModel.rotation()[1],
      showGolf: false,
      showHydrant: true
    });
  };

  handleHydrantClick = () => {
    this.setState({
      rotation: VrHeadModel.rotation()[1],
      showHydrant: false,
      showYouWin: true

    });
  };

  render() {
    let hoody,start,golf,hydrant,youWin;
    if (this.state.showStart) {
      start =
      <VrButton onClick={ this.handleStartClick }>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: 6,
            height: 2,
            borderColor: "black",
            transform: [{translate: [ -3, 25, -20 ]}]
        }}>
          <Text
            style={{
              fontSize: 1,
              color: 'black'
            }}
          >START</Text>
        </View>
      </VrButton>
    }
    if (this.state.showYouWin) {
      start =
      <VrButton onClick={ this.handleHydrantClick }>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: 10,
            height: 2,
            borderColor: "black",
            transform: [{rotateY: this.state.rotation},{translate: [ -5, 20, -20 ]}]
        }}>
          <Text
            style={{
              fontSize: 1,
              color: 'black'
            }}
          >YOU WIN!</Text>
        </View>
      </VrButton>
    }
    if (this.state.showHoody){
      hoody = <Image
        source={asset('hoody.svg')}
        pointerEvents="none"
        style={{
          transform: [
            {rotateY: 0},
            {translate: [-5, 25, -20]},
          ],
          height: 10,
          width: 10,
      }}/>;
    }
    if (this.state.showGolf){
      golf = <Image
        source={asset('golf.svg')}
        pointerEvents="none"
        style={{
          transform: [
            {rotateY: this.state.rotation},
            {translate: [-5, 25, -15]},
          ],
          height: 10,
          width: 10,
      }}/>;
    }
    if (this.state.showHydrant){
      hydrant = <Image
        source={asset('hydrant.svg')}
        pointerEvents="none"
        style={{
          transform: [
            {rotateY: this.state.rotation},
            {translate: [0, 25, -15]},
          ],
          height: 10,
          width: 10,
      }}/>;
    }


    return (
      <View>
        <Pano source={asset('street.jpg')}/>

        <VrButton onClick={ this.handleHoodyClick }>
          <View style={{
            transform: [
              {rotateY: 26.5},
              {translate: [-5, 4, -50]},
            ],
            borderWidth: .25,
            borderColor: "black",
            height: 10,
            width: 5,
          }} />
        </VrButton>

        <VrButton onClick={ this.handleGolfClick }>
          <View style={{
            transform: [
              {rotateY: 220},
              {translate: [10, 10, -50]},
            ],
            borderWidth: .25,
            borderColor: "black",
            height: 10,
            width: 20,
          }} />
        </VrButton>

        <VrButton onClick={ this.handleHydrantClick }>
          <View style={{
            transform: [
              {rotateY: 67},
              {translate: [-1.5, 22, -75]},
            ],
            borderWidth: .25,
            borderColor: "black",
            height: 6,
            width: 3,
          }} />
        </VrButton>


        { start }
        { hoody }
        { golf }
        { hydrant }
        { youWin }



      </View>
    );
  }
};

AppRegistry.registerComponent('view_react_vr', () => view_react_vr);

/*
"display",
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "margin",
  "marginVertical",
  "marginHorizontal",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "padding",
  "paddingVertical",
  "paddingHorizontal",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "position",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "alignSelf",
  "alignContent",
  "overflow",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "aspectRatio",
  "zIndex",
  "direction",
  "layoutOrigin",
  "animation",
  "renderGroup",
  "shadowColor",
  "shadowOffset",
  "shadowOpacity",
  "shadowRadius",
  "transform",
  "transformMatrix",
  "scaleX",
  "scaleY",
  "rotation",
  "translateX",
  "translateY",
  "backfaceVisibility",
  "backgroundColor",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderStyle",
  "opacity",
  "elevation" */

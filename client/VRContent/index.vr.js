import React from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, Sound, Model, VideoPano, Plane, asset, Image, StyleSheet, AmbientLight, VrButton, Animated, NativeModules, VrHeadModel} from 'react-vr';
import items0 from "./items0.json";
import items1 from "./items1.json";
import items2 from "./items2.json";
import items3 from "./items3.json";
import levels from "./levels.json";
import TimeConsole from "./TimeConsole.js";
import Timer from './Timer.js';
import Button from './Button.js';
import TextboxVr from './TextboxVr.js';
import MissionItemExpir from './MissionItemExpir.js';
import Score from './Score.js';
import StartButton from './StartButton.js';
import io from 'socket.io-client';

// CHANGE URL FOR PRODUCTION !!!!!!
const socket = io('http://localhost:3001/');

    // let levelStart;
    // if(this.state.win){
    //   levelStart =
    //       <View style={styles.gazeView}>
    //         <GazeButton onClick={()=> this.increment()} duration={500}
    //           >
    //           {time => (
    //             <Text style={styles.gazeText}>
    //               {GazeButtClicked ? 'BLAST OFF!' : `YOU WON. NICE.${time}`}
    //             </Text>
    //           )}
    //         </GazeButton>
    //       </View>
    // }else if ((!this.state.win && this.state.level === 0) || (!this.state.win && this.state.level === 1)){
    //   <View>
    //     <StartButton start={this.start.bind(this)} {...this.state} />
    //   </View>
    // }else if((!this.state.win && !this.state.level === 0) || (!this.state.win && !this.state.level === 1)){
    //   console.log("Run workmhole here");
    //   <View>
    //     <Score score={this.state.score} />
    //     <Timer timer={this.state.timer} score={this.state.score}{...this.state} />
    //     <Button startGame={this.startGame.bind(this)} {...this.state} />
    //   </View>
    // }
const vrTextboxContent =
  'The game Time Console is not available!';
const itemsArray = [ items0, items0, items0, items1, items2, items3];
class TimeBender extends React.Component {
  state = {
<<<<<<< HEAD
        level: 0,
        startButtonStatus: false,
        deviceConnected: false,
        room: Date.now(),
        currentItem: 1,
        status: '',
        items: items0,

        timer: 20,
        fadeAnim: new Animated.Value(1),
        GazeButtClicked: false,
        renderVrTextbox: false,
        visibleZero: 'active',
        visibleOne: 'active',
        visibleTwo: 'active',
        score: 0,
        win: false,
        transitionComplete: true,
        introduced: false,
        rotation: 130,
        perLevel: 0
      };
=======
    level: 0,
    startButtonStatus: false,
    deviceConnected: false,
    room: Date.now(),
    currentItem: 0,
    status: '',
    items: items0,

    timer: 20,
    fadeAnim: new Animated.Value(1),
    GazeButtClicked: false,
    renderVrTextbox: false,
    visibleZero: 'active',
    visibleOne: 'active',
    visibleTwo: 'active',
    score: 0,
    win: false,
    transitionComplete: true,
    introduced: false,
    rotation: 130
  };
>>>>>>> d03d520b9e9efe09009d84cf327559d6f0ff22ad
    startTimer = this.startTimer.bind(this);
    _toggleDisplay = this.toggleDisplay.bind(this);
    lastUpdate = Date.now();

    stopProgressZero = this.stopProgress.bind(this);
    onGazeZero = this.onGazeZero.bind(this);
    animateProgressZero = this.animateProgressZero.bind(this);
    onGazeOne = this.onGazeOne.bind(this);
    animateProgressOne = this.animateProgressOne.bind(this);
    onGazeTwo = this.onGazeTwo.bind(this);
    animateProgressTwo = this.animateProgressTwo.bind(this);
    rotate = this.rotate.bind(this);
    start = this.start.bind(this);

    rotate() {
      const now = Date.now();
      const delta = now - this.lastUpdate;
      rotate = this.rotate.bind(this);
      this.lastUpdate = now;
      this.setState({
          rotation: this.state.rotation + delta / 8
      });
      this.frameHandle = requestAnimationFrame(this.rotate);
    }

    foundItem = (itemIndex) => {
      console.log("Hello, item index: "+ itemIndex);
      const nextItems = this.state.items;
      console.log("json copy: "+ nextItems);
      nextItems[itemIndex].found = true;
      this.setState({
        items: nextItems,
        currentItem: this.state.currentItem + 1
      }, () => {
        const nextState = {
          items: this.state.items,
          currentItem: this.state.currentItem
        };
        socket.emit('updateState', nextState);
        console.log(`VR emitted : ${nextState}`);
      });
    };

   componentDidUpdate(){
    switch (this.state.status) {
        case 'started':
          this.timer;
          break;
        case 'stopped':
          clearInterval(this.timer);
          break;
      }
    }

  toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrTextbox: !this.state.renderVrTextbox});
    } else {
      // Not in VR, so let's use the dom overlay!
      NativeModules.DomOverlayModule.openOverlay(this.state.items);
    }
  }

  startTimer() {
    let x = this.state.timer
    if(x === 0){
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 0}
      ).start();
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 1}
      ).start();
     return this.setState({status: 'stopped', timer: levels[this.state.level].timer}, () => {
       const nextState = {
         status: 'stopped'
       }
       this.setState(nextState, () => {
         socket.emit('updateState', nextState);
         console.log(`vr emitted: ${JSON.stringify(nextState)}`);
       });
     });
    } else{
      x -= 1
      this.setState({timer: x})
    }
  }

  startGame() {
    this.setState({transitionComplete:false})
    this.timer = setInterval(this.startTimer,1000);
    const nextState = {
      status: 'started',
      startButtonStatus: true,
    };
    this.setState(nextState, () => {
      nextState.items = this.state.items;
      socket.emit('updateState', nextState);
    });

  }

  start() {
   level = (this.state.level += 1)
   this.setState({level: level})
  }

  animateProgress() {
    console.log("Progress helloo");
    this.timeout = setTimeout(this.onGaze, 1000);
    // begin animation
  }

  stopProgress() {
    clearTimeout(this.timeout);
    this.timeout = null;
    // end animation
  }

  // call when level is won, next state will emit, story will mount
  levelWinEmit = () => {
    socket.emit('updateState', { status: this.state.status });
    console.log(`VR emitted : ${this.state.status}`);
  };

  onGazeZero() {
    //set state which sets opacity? set opacity?
    console.log("helloo");
    this.state.score +=1;
    this.state.perLevel +=1;
    this.setState({visibleZero: 'inactive'})
<<<<<<< HEAD
  //  this.toggleDisplay()
  if(this.state.perLevel == 3 && this.state.status == 'started'){
    this.setState({win: true, timer: 0, status: 'stopped'})
=======
    //  this.toggleDisplay()
    if(this.state.score == 3 && this.state.status == 'started'){
      this.setState({
        win: true,
        timer: 0,
        status: 'stopped'})
>>>>>>> d03d520b9e9efe09009d84cf327559d6f0ff22ad
    }
    this.foundItem(0);
    this.levelWinEmit();
  }

  onGazeOne() {
    //set state which sets opacity? set opacity?
    console.log("helloo");
    this.state.score +=1;
    this.state.perLevel +=1;
    this.setState({visibleOne: 'inactive'})
<<<<<<< HEAD
  //  this.toggleDisplay()
  if(this.state.perLevel == 3 && this.state.status == 'started'){
    this.setState({win: true, timer: 0, status: 'stopped'})
    }
    this.foundItem(1);
=======
    //  this.toggleDisplay()
    if(this.state.score == 3 && this.state.status == 'started'){
      this.setState({win: true, timer: 0, status: 'stopped'})
      }
      this.foundItem(1);
      this.levelWinEmit();
>>>>>>> d03d520b9e9efe09009d84cf327559d6f0ff22ad
  }

  onGazeTwo() {
    //set state which sets opacity? set opacity?
    console.log("helloo");
    this.state.score +=1;
    this.state.perLevel +=1;
    this.setState({visibleTwo: 'inactive'})
<<<<<<< HEAD
  //  this.toggleDisplay()
  if(this.state.perLevel == 3 && this.state.status == 'started'){
    this.setState({win: true, timer: 0, status: 'stopped'})
=======
    //  this.toggleDisplay()
    if(this.state.score == 3 && this.state.status == 'started'){
      this.setState({win: true, timer: 0, status: 'stopped'})
>>>>>>> d03d520b9e9efe09009d84cf327559d6f0ff22ad
    }
    this.foundItem(2);
    this.levelWinEmit();
  }

  increment() {
    console.log("It incremented!");
    this.state.level +=1;
<<<<<<< HEAD
   return this.setState({status: 'stopped', timer: levels[this.state.level].timer, items: itemsArray[this.state.level], visibleZero: 'active', visibleOne: 'active', visibleTwo: 'active', perLevel: 0, win: false});
=======
    this.setState({
      status: 'stopped',
      timer: levels[this.state.level].timer,
      items: itemsArray[this.state.level],
      visibleZero: 'active',
      visibleOne: 'active',
      visibleTwo: 'active',
      score: 0,
      win: false,
    }, () => {
      let nextState = {
        status: this.state.status,
        items: this.state.items,
      };
      socket.emit('updateState', nextState);
    });
>>>>>>> d03d520b9e9efe09009d84cf327559d6f0ff22ad
  }

  //begin object gaze button functions
  animateProgressZero() {
    this.timeout = setTimeout(this.onGazeZero, 1000);
    // begin animation
  }
   //begin object gaze button functions
  animateProgressOne() {
    this.timeout = setTimeout(this.onGazeOne, 1000);
    // begin animation
  }
   //begin object gaze button functions
  animateProgressTwo() {
    this.timeout = setTimeout(this.onGazeTwo, 1000);
    // begin animation
  }
  stopProgressZero() {
    clearTimeout(this.timeout);
    this.timeout = null;
    // end animation
  }
   stopProgressOne() {
    clearTimeout(this.timeout);
    this.timeout = null;
    // end animation
  }
   stopProgressTwo() {
    clearTimeout(this.timeout);
    this.timeout = null;
    // end animation
  }

  componentDidMount() {
    // connect to new room with socket.io
    socket.emit('newRoom',
      {room: this.state.room, client: 'vr'},
      function(error, message) {
      console.log(`VR joining newRoom: ${message}`);
    });
    socket.on('updateState', nextState => {
      this.setState(nextState);
      console.log(`VR received state: ${JSON.stringify(nextState)}`);
    });
  }

  //   onGaze(){
  //   //set state which sets opacity? set opacity?
  //   console.log("helloo")
  //   this.state.score +=1;
  //   this.setState({visible: 'inactive'})
  // //  this.toggleDisplay()
  // if(this.state.score == 4 && this.state.status == 'started'){
  //   this.setState({win: true, timer: 0, status: 'stopped'})
  //   }
  // }
  // end item disappear button

  render() {
    const { GazeButtClicked } = this.state;
    return (
      <View style={ styles.rootView }>
        <View style={ styles.triggerContainer }>
          <VrButton style={ styles.triggerButton } onEnter={ this._toggleDisplay }>
            <Text style={ styles.triggerText }>AMPLIFY!</Text>
          </VrButton>
        </View>
        { this.state.renderVrTextbox && <TextboxVr text={vrTextboxContent} /> }

          <AmbientLight intensity={ 1.6 } />

          <Animated.View>
          <Model
            source={{
              obj: asset('scientist_projection.obj'),
              mtl: asset('scientist_projection.mtl')
              }}
            style={{
            transform: [
              {translate: [15, 1, -20]},
              {scale: 0.20 },
              {rotateY: 3},
              {rotateX: this.state.rotation},
              {rotateZ: 3}
            ],
          }}
          />
          </Animated.View>
          <TimeConsole/>
          <Pano source={ asset(levels[this.state.level].image) }/>

          <MissionItemExpir
            visible={ this.state.visibleZero }
            status={ this.state.status }

            title={this.state.items[0].title}
            source={this.state.items[0].source}
            texture={this.state.items[0].texture}
            translate={this.state.items[0].translate}
            rotate={this.state.items[0].rotate}
            scale={this.state.items[0].scale}
            found={this.state.items[0].found}
            image={this.state.items[0].image}
            lit={this.state.items[0].lit}
            onEnter={ () => this.animateProgressZero() }
            onExit={ () => this.stopProgressZero() }
            onClick={ () => this.onGazeZero() }
          />

          <MissionItemExpir
            visible={this.state.visibleOne}
            status={this.state.status}

            title={this.state.items[1].title}
            source={this.state.items[1].source}
            texture={this.state.items[1].texture}
            translate={this.state.items[1].translate}
            rotate={this.state.items[1].rotate}
            scale={this.state.items[1].scale}
            found={this.state.items[1].found}
            image={this.state.items[1].image}
            lit={this.state.items[1].lit}
            onEnter={ () => this.animateProgressOne() }
            onExit={ () => this.stopProgressOne() }
            onClick={ () => this.onGazeOne() }
          />

          <MissionItemExpir
            visible={this.state.visibleTwo}
            status={this.state.status}

            title={this.state.items[2].title}
            source={this.state.items[2].source}
            texture={this.state.items[2].texture}
            translate={this.state.items[2].translate}
            rotate={this.state.items[2].rotate}
            scale={this.state.items[2].scale}
            found={this.state.items[2].found}
            image={this.state.items[2].image}
            lit={this.state.items[2].lit}
            onEnter={ () => this.animateProgressTwo() }
            onExit={ () => this.stopProgressTwo() }
            onClick={ () => this.onGazeTwo() }
          />

          <View>
            { this.state.win ?
            <VrButton style={styles.gazeView}
              onClick={()=>this.increment()}>
              <Text style={styles.gazeText}>VICTORY! NEXT LEVEL?</Text>
            </VrButton>
                  :
            <View>
            </View>
              }
              <View>
              {(this.state.level === 0) || (this.state.level === 1) ?
                starter =
                <View>
                <StartButton start={this.start.bind(this)} {...this.state} />
                </View>
                :
                starter = <View>
                <Score score={this.state.score} />
              <Timer timer={this.state.timer} score={this.state.score}{...this.state} />
            <Button startGame={this.startGame.bind(this)} {...this.state} updateState={ this.updateState } />
            </View>
          }
          </View>
        </View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  onGaze:{
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    color: 'black',
    borderRadius: 0.25,
    transform: [{translate: [2, 2, -4]}],
  },

  imageStyle:{
    width: 50,
    height: 50,
    transform: [{translate: [1, 2, -5]}]
  },

  invisiGaze:{
    display: 'none',
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    color: 'black',
    borderRadius: 0.25,
    transform: [{translate: [2, 2, -4]}],
  },

  gazeView:{
    fontSize: 0.3,
    backgroundColor: '#fff',
    width: 0.7,
    height: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    color: 'black',
    borderRadius: 0.25,
    transform: [{translate: [0, 1, -4]}],
  },

  gazeText:{
    textAlign: 'center',
    fontSize: 0.15,
    color: 'red'
  },

  timer:{
    textAlign: 'center',
    fontSize: 0.15,
    color: '#fff',
    transform: [{translate: [2, 0, -4]}]
  },

  rootView: {
    layoutOrigin: [0.5, 0.5],
    position: 'absolute',
  },

  triggerContainer: {
    transform: [{translate: [0.24, -3.3, -4]}]
  },

  triggerButton: {
    transform: [{rotateX: -45}],
    borderRadius: 0.05,
    height: 0.4,
    width: 0.7,
    backgroundColor: '#F00',
    justifyContent: 'center',
  },

  triggerText: {
    alignSelf: 'center',
    fontSize: 0.15,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

AppRegistry.registerComponent('TimeBender', () => TimeBender);

'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class ArenaGame extends Component {

  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text : "preparing arena.."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
  }


  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
       
        
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        
        <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
         <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
        </ViroNode>
        
        
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, -5]} color="#ffffff" castsShadow={true} />
          {/* <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                require('./res/emoji_smile/emoji_smile_normal.png'),
                require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[-.5, .5, -1]}
            scale={[.2, .2, .2]}
            type="VRX" /> */}

            {/* TODO UPDATE MODELS BASED ON USER'S PICK */}
            <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            position={[-1, 0, -5]}
            animation={{name: "rotatePlayerOne", run: true, loop: true}}
            scale={[0.8, 0.8, 0.8]}
            
            type="VRX"
            dragType="FixedDistance" onDrag={()=>{}}
          />

          {/* TODO UPDATE MODELS BASED ON USER'S PICK */}
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            position={[1, 0, -1]}
            scale={[0.8, 0.8, 0.8]}
            animation={{name: "rotatePLayerTwo", run: true, loop: false}}
            onLoadEnd={this._onLoadEnd}
            type="VRX"
            dragType="FixedDistance" onDrag={()=>{}}
          />
       
 
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Summoning dragons.."
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onLoadEnd() {
    this.setState({
      text : "FIGHT"
    });
    setTimeout(() => {
      
      this.setState({
        text : "player x wins"
      });
      
      //navigate push to win page
    }, 10000);
 }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotatePLayerOne: {
    properties: {
      rotateY: "+90"
    },
    duration: 250, //.25 seconds
  }
});

ViroAnimations.registerAnimations({
  rotatePLayerTwo: {
    properties: {
      rotateY: "-180"
    },
    duration: 250, //.25 seconds
  }
});

module.exports = ArenaGame;
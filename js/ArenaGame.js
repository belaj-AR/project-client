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
  ViroSceneNavigator,
  ViroScene,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
} from 'react-viro';

export default class ArenaGame extends Component {

  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text : "preparing arena..",
      welcomeText: "opening portal",
      summonDragons: true,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
  }


  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
       
         
        {/* <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
         <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
        </ViroNode> */}

        
        
        <ViroAmbientLight color={"#aaaaaa"} />

        
        {/* <ViroAmbientLight color={"#aaaaaa"} /> 
 
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, -5]} color="#ffffff" castsShadow={true} />  */}
          

            
          <ViroText text={this.state.welcomeText} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

          <ViroAmbientLight color="#ffffff" intensity={200}/>
          <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}} >
            <ViroPortal position={[0, 0, -3]} scale={[.1, .1, .1]}>
              <Viro3DObject source={require('./res/portal_res/portal_ship/portal_ship.vrx')}
                resources={[require('./res/portal_res/portal_ship/portal_ship_diffuse.png'),
                            require('./res/portal_res/portal_ship/portal_ship_normal.png'),
                            require('./res/portal_res/portal_ship/portal_ship_specular.png')]}
                type="VRX" onLoadEnd={this.portalOnLoad}/>
            </ViroPortal>
            <Viro360Image source={require("./res/portal_res/arena_360.jpg")} />

            
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -4]} style={styles.helloWorldTextStyle} />


            {this.state.summonDragons && 
             
                <ViroAmbientLight color="#ffffff" intensity={200}>
                  <Viro3DObject
                  source={require('./res/emoji_smile/emoji_smile.vrx')}
                  position={[-1, 0, -8]}
                  animation={{name: "rotatePlayerOne", run: true, loop: true}}
                  scale={[0.8, 0.8, 0.8]}
                  
                  type="VRX"
                  dragType="FixedDistance" onDrag={()=>{}}
                /> 
              </ViroAmbientLight>
              
           
             }

             <Viro3DObject
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              position={[1, 0, -7]}
              scale={[0.8, 0.8, 0.8]}
              animation={{name: "rotatePLayerTwo", run: true, loop: false}}
              onLoadEnd={this._onLoadEnd}
              type="VRX"
              dragType="FixedDistance" onDrag={()=>{}}
              />


            



            <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
              <ViroPortal position={[0, 0, -9]} scale={[.1, .1, .1]}>
                <Viro3DObject source={require('./res/portal_res/portal_ship/portal_ship.vrx')}
                  resources={[require('./res/portal_res/portal_ship/portal_ship_diffuse.png'),
                              require('./res/portal_res/portal_ship/portal_ship_normal.png'),
                              require('./res/portal_res/portal_ship/portal_ship_specular.png')]}
                  type="VRX"/>
              </ViroPortal>
            <Viro360Image source={require("./res/portal_res/360_island.jpg")} />


            
        </ViroPortalScene>


        </ViroPortalScene>
       
 
      </ViroARScene>
    );
  }

  portalOnLoad = () => {
    this.setState({
      welcomeText: "step inside"
    });
  }

  summonDragons = () => {
    setTimeout( () => {
      this.setState({
        summonDragons: true
      });
    }, 10000)

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
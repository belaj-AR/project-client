'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroAnimations,
  Viro360Image,
  ViroPortal,
  ViroPortalScene,
  ViroParticleEmitter
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
      
        <ViroAmbientLight color={"#aaaaaa"} />
            
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

            {/* <Viro3DObject
              source={require('./res/heroes/redDragon/orange-dragon.vrx')}
              resources={[require('./res/heroes/redDragon/color-map-dents.png'),
                          require('./res/heroes/redDragon/color-map-eye.jpg'),
                          require('./res/heroes/redDragon/color_map1.jpg'),
                          require('./res/heroes/redDragon/normal-map-dents.png'),
                          require('./res/heroes/redDragon/normal_map.png'),
                          require('./res/heroes/redDragon/specmap.jpg'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/color-map-dents.png'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/color-map-eye.jpg'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/color_map1.jpg'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/normal-map-dents.png'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/normal_map.png'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/specmap.jpg')]}
              position={[1, 0, -7]}
              scale={[0.8, 0.8, 0.8]}
              animation={{name: "rotatePLayerOne", run: true, loop: false}}
              onLoadEnd={this._onLoadEnd}
              type="VRX"
              dragType="FixedDistance" onDrag={()=>{}}
            /> */}
        <ViroNode position={[0, 0, -9]} scale={[.8, .8, .8]} dragType="FixedToWorld" onDrag={()=>{}}>
             <Viro3DObject
              source={require('./res/heroes/redDragon/orange-dragon.vrx')}
              resources={[require('./res/heroes/redDragon/color-map-dents.png'),
                          require('./res/heroes/redDragon/color-map-eye.jpg'),
                          require('./res/heroes/redDragon/color_map1.jpg'),
                          require('./res/heroes/redDragon/normal-map-dents.png'),
                          require('./res/heroes/redDragon/normal_map.png'),
                          require('./res/heroes/redDragon/specmap.jpg'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/color-map-dents.png'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/color-map-eye.jpg'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/color_map1.jpg'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/normal-map-dents.png'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/normal_map.png'),
                          require('./res/heroes/redDragon/orange-dragon.fbm/specmap.jpg')]}
              animation={{name: "rotatePLayerTwo", run: true, loop: false}}
              scale={[.5, .5, .5]}
              onLoadEnd={this._onLoadEnd}
              type="VRX"
              />

            {/* Start Particle */}
            <ViroNode position={[-.6, 0, .2]} scale={[1, 1, 1]}>
              <ViroParticleEmitter
                duration={1200}
                visible={true}
                run={true}
                loop={true}
                fixedToEmitter={false}
                scale={[1, 1, 1]}
                image={{
                  source:require("./res/particles/particle_fire.png"),
                  height:0.3,
                  width:0.3,
                  bloomThreshold:0.0
                }}

                 spawnBehavior={{
                    particleLifetime:[500,500],
                    emissionRatePerSecond:[200,200],
                    maxParticles:1000,
                    spawnVolume:{
                      shape:"box",
                      params:[.7, .1, .1],
                      spawnOnSurface:false
                    },
                  }}

                particleAppearance={{
                  opacity:{
                    initialRange:[0.0, 0.0],
                    interpolation:[
                      {endValue:0.4, interval:[0,200]},
                      {endValue:0.0, interval:[900,1500]}
                    ]
                  },
                }}

                particlePhysics={{
                    velocity:{initialRange:[[0,.3,0], [0,.5,0]]}
                  }}
                />
            </ViroNode>
            {/* End Particle */}
          
          </ViroNode>
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

{/* <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
  <ViroPortal position={[0, 0, -9]} scale={[.1, .1, .1]}>
    <Viro3DObject source={require('./res/portal_res/portal_ship/portal_ship.vrx')}
      resources={[require('./res/portal_res/portal_ship/portal_ship_diffuse.png'),
                  require('./res/portal_res/portal_ship/portal_ship_normal.png'),
                  require('./res/portal_res/portal_ship/portal_ship_specular.png')]}
      type="VRX"/>
    </ViroPortal>
  <Viro360Image source={require("./res/portal_res/360_island.jpg")} /> 
</ViroPortalScene> */}
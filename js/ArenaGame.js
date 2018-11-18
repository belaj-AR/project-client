'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroAnimations,
  Viro360Image,
  ViroPortal,
  ViroPortalScene,
  ViroParticleEmitter,
  ViroSpatialSound
} from 'react-viro';

export default class ArenaGame extends Component {

  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text : "preparing arena..",
      welcomeText: "Touch Diamond When You Are Ready!!!",
      summonDragons: true,
      playerReady: false,
      portalSound: false,

      playerOneLose: false,
      playerTwoLose: false
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  setPlayerLose = () => {
    setTimeout( () => {
      this.setState({
        playerOneLose: true
      });
    }, 7000)
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
      
        <ViroAmbientLight color={"#aaaaaa"} />
            
          <ViroText 
            text={this.state.welcomeText} 
            scale={[.5, .5, .5]} 
            position={[0, 0, -1]} 
            width={2} height={2}
            textLineBreakMode="wordwrap"
            style={styles.helloWorldTextStyle} />
          
          <ViroAmbientLight color="#ffffff" intensity={200}/>
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                require('./res/emoji_smile/emoji_smile_normal.png'),
                require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[0, 0, -1]}
            scale={[.2, .2, .2]}
            onClick={() => this.setState({playerReady: true, portalSound: true, welcomeText: 'Opening Portal'})}
            type="VRX" />

          <ViroAmbientLight color="#ffffff" intensity={200}/>
          
          {this.state.playerReady && this.loadPortal()}
       
 
      </ViroARScene>
    );
  }

  // portalOnLoad = () => {
  //   // this.props.arSceneNavigator.customNavigation()
  //   this.setState({
  //     welcomeText: 'Inside'
  //   });
  // }

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


 loadPortal = () => {
    return (
          <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}} >
            <ViroPortal position={[0, 0, 0]} scale={[.7, .7, .4]}>
              <Viro3DObject source={require('./res/portal_res/portal_ship/portal_ship.vrx')}
                resources={[require('./res/portal_res/portal_ship/portal_ship_diffuse.png'),
                            require('./res/portal_res/portal_ship/portal_ship_normal.png'),
                            require('./res/portal_res/portal_ship/portal_ship_specular.png')]}
                type="VRX"
                onLoad={() => this.setState({portalSound : false})}/>
            </ViroPortal>
            <Viro360Image source={require("./res/portal_res/arena_360.jpg")} />

            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -4]} style={styles.helloWorldTextStyle} />

           <ViroNode 
            position={[-4, 0, -14]} 
            scale={[0.8, 0.8, 0.8]}
            animation={{name: "playerOneMove", run: true, loop: true}}>
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
              position={[0, 2, 0]}
              rotation={[0, 90, 0]}
              scale={[0.3, 0.3, 0.3]}
              onLoadEnd={this.setPlayerLose}
              type="VRX"
              />
              {/* <ViroNode position={[0, 0, 0]} scale={[0, 0, 0]}>
                <ViroSpatialSound
                    rolloffModel="linear"
                    paused={false}
                    muted={false}
                    minDistance={15}
                    maxDistance={5}
                    source={require('../js/res/sounds/arena/dragons/roar1.wav')}
                    loop={true}
                    volume={1}
                    onFinish={this.onFinishSpatial}
                    onError={this.onErrorSpatial}/>
              </ViroNode> */}

              <ViroNode position={[.2, 2, 0]} scale={[1, 1, 1]}>
                  <ViroParticleEmitter
                  duration={1200}
                  visible={this.state.playerOneLose}
                  run={true}
                  loop={true}
                  fixedToEmitter={false}

                  image={{
                    source:require("./res/particles/particle_fire.png"),
                    height:8,
                    width:8,
                    bloomThreshold:0.0
                  }}

                  spawnBehavior={{
                    particleLifetime:[500,500],
                    emissionRatePerSecond:[30, 40],
                    maxParticles:800
                  }}

                  particleAppearance={{
                    opacity:{
                      initialRange:[0.2, 0.2],
                      factor:"time",
                      interpolation:[
                        {endValue:0.2, interval:[0,200]},
                        {endValue:0.0, interval:[200,500]},
                      ]
                    },
                    scale:{
                      initialRange:[[1,1,1], [1,1,1]],
                      factor:"time",
                      interpolation:[
                        {endValue:[0,0,0], interval:[150,500]},
                      ]
                    },

                  }}

                  particlePhysics={{
                    velocity:{initialRange:[[2,2,0], [2,-2,0]]},
                    acceleration:{initialRange:[[0,0,0], [0,0,0]]}
                  }}
                  />
              </ViroNode>
      
          </ViroNode>





            {/* <ViroNode position={[4, 0, -14]} scale={[0.8, 0.8, 0.8]}>
             <Viro3DObject */}
              {/* source={require('./res/heroes/redDragon/orange-dragon.vrx')}
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
              position={[0, 2, 0]}
              rotation={[0, -90, 0]}
              scale={[0.3, 0.3, 0.3]}
              onLoadEnd={this._onLoadEnd}
              type="VRX"
              />
              <ViroSpatialSound
                  rolloffModel="linear"
                  paused={false}
                  muted={false}
                  minDistance={3}
                  maxDistance={5}
                  position={[1, 0, -7]}
                  source={require('../js/res/sounds/arena/dragons/roar1.wav')}
                  loop={true}
                  volume={1.0}
                  onFinish={this.onFinishSpatial}
                  onError={this.onErrorSpatial}/>

         
            <ViroNode position={[-.2, 2, 0]} scale={[1, 1, 1]}>
                <ViroParticleEmitter
                duration={1200}
                visible={true}
                run={true}
                loop={true}
                fixedToEmitter={false}

                image={{
                  source:require("./res/particles/particle_fire.png"),
                  height:8,
                  width:8,
                  bloomThreshold:0.0
                }}

                spawnBehavior={{
                  particleLifetime:[500,500],
                  emissionRatePerSecond:[30, 40],
                  maxParticles:800
                }}

                particleAppearance={{
                  opacity:{
                    initialRange:[0.2, 0.2],
                    factor:"time",
                    interpolation:[
                      {endValue:0.2, interval:[0,200]},
                      {endValue:0.0, interval:[200,500]},
                    ]
                  },
                  scale:{
                    initialRange:[[1,1,1], [1,1,1]],
                    factor:"time",
                    interpolation:[
                      {endValue:[0,0,0], interval:[150,500]},
                    ]
                  },

                }}

                particlePhysics={{
                  velocity:{initialRange:[[0,.3,0], [0,.5,0]]}
                }}
                />
            </ViroNode>
           
          </ViroNode> */}
        </ViroPortalScene>
        
    )
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
  moveUp:{properties:{positionY:"+=0.9"}, duration: 1000},
  moveDown:{properties:{positionY:"-=0.9"}, duration: 1000},
  playerOneMove:[
    ["moveUp", "moveDown"],
  ]
});


module.exports = ArenaGame;


       
// {
//   this.state.portalSound && 
//   ( 
//     <ViroNode position={[0, 0, 0]} scale={[0, 0, 0]}>
//       <ViroSpatialSound
//           rolloffModel="linear"
//           paused={this.state.portalSound}
//           muted={false}
//           minDistance={10}
//           maxDistance={5}
//           source={require('../js/res/sounds/portal/air_portal.wav')}
//           loop={true}
//           volume={1}
//           />
//     </ViroNode>
//   )
// }
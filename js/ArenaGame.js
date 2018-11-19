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

    this.state = {
      welcomeText: "TOUCH SHIELD BELOW",
      message : "PREPARING ARENA",

      getStarted: true,

      summonDragons: true,
      playerReady: false,
      portalSound: false,
      
      player1: {
        name: '',
        status: false
      },
      player2: {
        name: '',
        status: false
      },

      playerOne : {
        playerName: 'Harles',
        status: false,
        model3d:  require('./res/heroes/redDragon/orange-dragon.vrx'),
        textures:[require('./res/heroes/redDragon/color-map-dents.png'),
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
                  require('./res/heroes/redDragon/orange-dragon.fbm/specmap.jpg')]
      }
      
    };

  }

  componentDidMount = () => {
    console.log("this.props.arSceneNavigator.players")
  }

  setPlayerLose = () => {

    this.setState({
      player1: {
        name: this.props.arSceneNavigator.viroAppProps.players[0].fname
      },
      player2: {
        name: this.props.arSceneNavigator.viroAppProps.players[1].fname
      }
    })

    setTimeout( () => {
      this.setState({
       player1: { status : this.props.arSceneNavigator.viroAppProps.players[1].status },
       player2: { status : this.props.arSceneNavigator.viroAppProps.players[0].status }
      });
    }, 7000)

  }

  render() {

    const { players } = this.props.arSceneNavigator.viroAppProps

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
      
        <ViroAmbientLight color={"#aaaaaa"} />
      
          <ViroNode 
            position={[0, 0, -.4]}
            visible={this.state.getStarted}
          >
            <ViroText 
              text={this.state.welcomeText} 
              position={[0,.09,0]}
              scale={[.1, .1, .1]} 
              width={2} height={2}
              style={styles.getStartedTextStyle} />
            
            <ViroAmbientLight color="#ffffff" intensity={200}/>

            <Viro3DObject
              source={require('./res/start_game/Wonder_Woman_V_Shield.obj')}
              resources={[require('./res/start_game/Wonder_Woman_V_Shield.mtl')]}
              scale={[.2, .2, .2]}
              onClick={() => this.setState({playerReady: true, portalSound: true, welcomeText: 'OPENING GAME PORTAL'})}
              type="OBJ" />
          </ViroNode>


          <ViroAmbientLight color="#ffffff" intensity={200}/>
          
          {this.state.playerReady && this.loadPortal()}
  
      </ViroARScene>
    );
  }


  actionAfterLoadPortal = () => {
    this.setState({
      portalSound : false, 
      getStarted : false,
    })
  }

 loadPortal = () => {

  const { players } = this.props.arSceneNavigator.viroAppProps

    return (
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}} >
            <ViroPortal position={[0, 0, -1]} scale={[.4, .4, .4]}>
              <Viro3DObject source={require('./res/portal_res/portal_ship/portal_ship.vrx')}
                resources={[require('./res/portal_res/portal_ship/portal_ship_diffuse.png'),
                            require('./res/portal_res/portal_ship/portal_ship_normal.png'),
                            require('./res/portal_res/portal_ship/portal_ship_specular.png')]}
                type="VRX"
                onLoadEnd={ () => this.actionAfterLoadPortal()}/>
            </ViroPortal>
            <Viro360Image source={require("./res/portal_res/arena_360.jpg")} />
            

             <ViroNode 
              position={[-4, 0, -14]} 
              scale={[0.8, 0.8, 0.8]}
              animation={{name: "playerMove", run: true, loop: true}}
            >
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
                type="VRX"
                />

                <ViroNode
                  position={[.6, .4, 0]}
                >
                  <ViroText 
                    text={this.state.player1.name} 
                    scale={[.5, .5, .5]} 
                    width={8} height={8}
                    style={styles.playerNameStyle} />

                </ViroNode>

              {/* <ViroSpatialSound
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
                onError={this.onErrorSpatial}/> */}

              <ViroNode 
                position={[-.2, 3, 0]} 
                scale={[1, 1, 1]} 
                visible={this.state.player1.status}
                >

                <ViroParticleEmitter
                  duration={1200}
                  run={true}
                  loop={true}
                  fixedToEmitter={false}

                  image={{
                    source:require("./res/particles/particle_fire.png"),
                    height:10,
                    width:10,
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




            <ViroNode 
              position={[4, 0, -14]} 
              scale={[0.8, 0.8, 0.8]}
              animation={{name: "playerMove", run: true, loop: true}}
            >
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
                rotation={[0, -90, 0]}
                scale={[0.3, 0.3, 0.3]}
                onLoadEnd={this.setPlayerLose}
                type="VRX"
                />

                <ViroNode
                  position={[-.6, -.4, 0]}
                >
                  <ViroText 
                    text={this.state.player2.name} 
                    scale={[.5, .5, .5]} 
                    width={8} height={8}
                    style={styles.playerNameStyle} />

                </ViroNode>

              {/* <ViroSpatialSound
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
                onError={this.onErrorSpatial}/> */}

              <ViroNode 
                position={[-.2, 3, 0]} 
                scale={[1, 1, 1]} 
                visible={this.state.player2.status}
                >

                <ViroParticleEmitter
                  duration={1200}
                  run={true}
                  loop={true}
                  fixedToEmitter={false}

                  image={{
                    source:require("./res/particles/particle_fire.png"),
                    height:10,
                    width:10,
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

        </ViroPortalScene>
        
    )
 }


// summonDragons = () => {
//   setTimeout( () => {
//     this.setState({
//       summonDragons: true
//     });
//   }, 10000)
// }

// _onInitialized(state, reason) {
//   if (state == ViroConstants.TRACKING_NORMAL) {
//     this.setState({
//       text : "Summoning dragons.."
//     });
//   } else if (state == ViroConstants.TRACKING_NONE) {
//     // Handle loss of tracking
//   }
// }


}

var styles = StyleSheet.create({
  getStartedTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  playerNameStyle : {
    fontFamily: 'Arial',
    fontSize: 100,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});

ViroAnimations.registerAnimations({
  moveUp:{properties:{positionY:"+=0.9"}, duration: 1000},
  moveDown:{properties:{positionY:"-=0.9"}, duration: 1000},
  playerMove:[
    ["moveUp", "moveDown"],
  ]
});

module.exports = ArenaGame;


// particle on hero
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
</ViroNode> 

<ViroNode 
  position={[.2, 3, 0]} 
  scale={[1, 1, 1]} 
  visible={this.state.playerOne.status}
  onLoadEnd={this.getWinner}  
>
  <ViroParticleEmitter
    duration={1200}
    run={true}
    loop={true}
    fixedToEmitter={false}

    image={{
      source:require("./res/particles/particle_fire.png"),
      height:10,
      width:10,
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
</ViroNode> */}



// sound for portal
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
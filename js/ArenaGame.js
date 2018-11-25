'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import config from '../config'
const {firebaseDB} = config

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
      playerOneTexture: require('./res/particles/particle_fire_blue.png'),
      playerTwoTexture: require('./res/particles/particle_fire_green.png'),
      thisGreen: '',
      welcomeText: "",
      statusShield: true,

      statusPortal: true,
      getStarted: true,

      statusSummonDragons: true,
      summoningDragonText : "SUMMONING DRAGON",

      playerReady: false,
      portalSound: false,
      allPositionDragon: [0,0,-7],

      player1Id: '',
      player1Name: '',
      player1HP: '',
      player1OldHp: '',
      player1Dmg: '',
      player1Position: [-4.3, 0, 0],
      player1Status: false,

      player2Id: '',
      player2Name: '',
      player2HP: '',
      player2OldHp: '',
      player2Dmg: '',
      player2Position: [4.3, 0, 0],
      player2Status: false,

      // dummy data bellow
      statusPlayerReady: false,
      startAttack: false,
      statusParticleOne: false,
      statusParticleTwo: false,
      statusParticleOneAttack: false,
      statusParticleTwoAttack: false,

      statusWinner: '',
      playerOneObject : require('./res/heroes/redsDragon/red-dragon.vrx'),
      playerOneObjectTexture : [require('./res/heroes/redsDragon/color-map-dents.png'),
                                require('./res/heroes/redsDragon/color-map-eye.jpg'),
                                require('./res/heroes/redsDragon/color_map1_red.jpg'),
                                require('./res/heroes/redsDragon/normal-map-dents.png'),
                                require('./res/heroes/redsDragon/normal_map.png'),
                                require('./res/heroes/redsDragon/specmap.jpg')],
      playerTwoObject : require('./res/heroes/redsDragon/red-dragon.vrx'),
      playerTwoObjectTexture : [require('./res/heroes/redsDragon/color-map-dents.png'),
                                require('./res/heroes/redsDragon/color-map-eye.jpg'),
                                require('./res/heroes/redsDragon/color_map1_red.jpg'),
                                require('./res/heroes/redsDragon/normal-map-dents.png'),
                                require('./res/heroes/redsDragon/normal_map.png'),
                                require('./res/heroes/redsDragon/specmap.jpg')],
      
    };

  }

  onloadPlayerEnd = () => {
    this.setState({
      statusPlayerReady: true,
      statusSummonDragons: false,
      player1Name: this.props.arSceneNavigator.viroAppProps.propsFromGame.players.p1.fname,
      player2Name: this.props.arSceneNavigator.viroAppProps.propsFromGame.players.p2.fname
    })

  }

  getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  attackPlayerOne = () => {
   
    let currentHP = Number(this.state.player1HP); 
    let damage = this.state.player2Dmg;
    if (currentHP - damage >= 0) {
      let newHP = String(currentHP - damage);
      if (newHP < 0) {
        firebaseDB.ref(`/OnGame/onGameList/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).child('/p1/monster').update({
          health: 0,
        })

        firebaseDB.ref(`/OnGame/onGameList/`).child(`/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).update({
          status: "gameEnd"
        })
  
      } else {
        firebaseDB.ref(`/OnGame/onGameList/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).child('/p1/monster').update({
          health: newHP,
        })

      }
    } else {
      firebaseDB.ref(`/OnGame/onGameList/`).child(`/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).update({
        status: "gameEnd"
      })
    }

    let newPosition = [
      this.getRandomNumberBetween(-4,-10),
      0,
      this.getRandomNumberBetween(-4,4)
    ];

    firebaseDB.ref('/OnGame/onGameList/'+ this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId).once('value', (snapshot) => {
      
      if(String(snapshot.val().p1.monster.health) !== "0") {
        firebaseDB.ref(`/OnGame/onGameList/`).child(`/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).update({
          allPos : newPosition
        })
      }
      
      this.setState({
        player2OldHp: String(snapshot.val().p2.monster.health),
      })
    })    

  }

  attackPlayerTwo = () => {

    let currentHP = Number(this.state.player2HP); 
    let damage = this.state.player1Dmg;
    if (currentHP - damage >= 0) {
      let newHP = String(currentHP - damage);
      if (newHP < 0) {

        firebaseDB.ref(`/OnGame/onGameList/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).child('/p2/monster').update({
          health: 0   
        })

        firebaseDB.ref(`/OnGame/onGameList/`).child(`/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).update({
          status: "gameEnd"
        })
 
      } else {
      
        firebaseDB.ref(`/OnGame/onGameList/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).child('/p2/monster').update({
            health: newHP
        })
       
      }
    } else {
      firebaseDB.ref(`/OnGame/onGameList/`).child(`/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).update({
        status: "gameEnd"
      })
    }

    let newPosition = [
      this.getRandomNumberBetween(-4,-10),
      0,
      this.getRandomNumberBetween(-4,4)
    ];

    firebaseDB.ref('/OnGame/onGameList/'+ this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId).once('value', (snapshot) => {
      
      if(String(snapshot.val().p2.monster.health) !== "0") {
        firebaseDB.ref(`/OnGame/onGameList/`).child(`/${this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId}`).update({
          allPos : newPosition
        })
      }
      
      this.setState({
        player1OldHp: String(snapshot.val().p1.monster.health),
      })
    })

  }

  actionAfterLoadPortal = () => {
   
    firebaseDB.ref('/OnGame/onGameList/'+ this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId).once('value', (snapshot) => {  
      this.setState({
        portalSound : false, 
        getStarted : false,
        statusPortal: false,
        player1Status : true,
        player2Status : true,
        player1Dmg: snapshot.val().p1.monster.dmg,
        player2Dmg: snapshot.val().p2.monster.dmg,
        player1OldHp: String(snapshot.val().p1.monster.health),
        player2OldHp: String(snapshot.val().p2.monster.health),
        player1Id: snapshot.val().p1.id,
        player2Id: snapshot.val().p2.id
      })

      if(snapshot.val().p1.monster.source === "particle_fire_red.png"){
        this.setState({
          playerTwoTexture: require('./res/particles/particle_fire_red.png'),
          playerOneObject : require('./res/heroes/redsDragon/red-dragon.vrx'),
          playerOneObjectTexture : [require('./res/heroes/redsDragon/color-map-dents.png'),
                                require('./res/heroes/redsDragon/color-map-eye.jpg'),
                                require('./res/heroes/redsDragon/color_map1_red.jpg'),
                                require('./res/heroes/redsDragon/normal-map-dents.png'),
                                require('./res/heroes/redsDragon/normal_map.png'),
                                require('./res/heroes/redsDragon/specmap.jpg')],
        })
      }     
      if (snapshot.val().p1.monster.source === "particle_fire_blue.png") {
        this.setState({
          playerTwoTexture: require('./res/particles/particle_fire_blue.png'),
          playerOneObject : require('./res/heroes/blueDragon/blue-dragon.vrx'),
          playerOneObjectTexture : [require('./res/heroes/blueDragon/color-map-dents.png'),
                                require('./res/heroes/blueDragon/color-map-eye.jpg'),
                                require('./res/heroes/blueDragon/color_map1_blue.jpg'),
                                require('./res/heroes/blueDragon/normal-map-dents.png'),
                                require('./res/heroes/blueDragon/normal_map.png'),
                                require('./res/heroes/blueDragon/specmap.jpg')],
        })
      } 
      if (snapshot.val().p1.monster.source === "particle_fire_green.png") { 
        this.setState({
          playerTwoTexture: require('./res/particles/particle_fire_green.png'),
          playerOneObject : require('./res/heroes/greenDragon/green-dragon.vrx'),
          playerOneObjectTexture : [require('./res/heroes/greenDragon/color-map-dents.png'),
                                require('./res/heroes/greenDragon/color-map-eye.jpg'),
                                require('./res/heroes/greenDragon/color_map1_green.jpg'),
                                require('./res/heroes/greenDragon/normal-map-dents.png'),
                                require('./res/heroes/greenDragon/normal_map.png'),
                                require('./res/heroes/greenDragon/specmap.jpg')],
        })
      }
      if(snapshot.val().p2.monster.source === "particle_fire_red.png"){
        this.setState({
          playerOneTexture: require('./res/particles/particle_fire_red.png'),
          playerTwoObject : require('./res/heroes/redsDragon/red-dragon.vrx'),
          playerTwoObjectTexture : [require('./res/heroes/redsDragon/color-map-dents.png'),
                                require('./res/heroes/redsDragon/color-map-eye.jpg'),
                                require('./res/heroes/redsDragon/color_map1_red.jpg'),
                                require('./res/heroes/redsDragon/normal-map-dents.png'),
                                require('./res/heroes/redsDragon/normal_map.png'),
                                require('./res/heroes/redsDragon/specmap.jpg')],
        })
      } 
      if (snapshot.val().p2.monster.source === "particle_fire_blue.png") {
        this.setState({
          playerOneTexture: require('./res/particles/particle_fire_blue.png'),
          playerTwoObject : require('./res/heroes/blueDragon/blue-dragon.vrx'),
          playerTwoObjectTexture : [require('./res/heroes/blueDragon/color-map-dents.png'),
                                require('./res/heroes/blueDragon/color-map-eye.jpg'),
                                require('./res/heroes/blueDragon/color_map1_blue.jpg'),
                                require('./res/heroes/blueDragon/normal-map-dents.png'),
                                require('./res/heroes/blueDragon/normal_map.png'),
                                require('./res/heroes/blueDragon/specmap.jpg')],
        })
      } 
      if (snapshot.val().p2.monster.source === "particle_fire_green.png") { 
        this.setState({
          playerOneTexture: require('./res/particles/particle_fire_green.png'),
          playerTwoObject : require('./res/heroes/greenDragon/green-dragon.vrx'),
          playerTwoObjectTexture : [require('./res/heroes/greenDragon/color-map-dents.png'),
                                require('./res/heroes/greenDragon/color-map-eye.jpg'),
                                require('./res/heroes/greenDragon/color_map1_green.jpg'),
                                require('./res/heroes/greenDragon/normal-map-dents.png'),
                                require('./res/heroes/greenDragon/normal_map.png'),
                                require('./res/heroes/greenDragon/specmap.jpg')],
        })
      }
    })
  
    firebaseDB.ref('/OnGame/onGameList/'+ this.props.arSceneNavigator.viroAppProps.propsFromGame.players.gameId).on('value', (snapshot) => {
  
        if (snapshot.val().status === "gameEnd" && String(snapshot.val().p1.monster.health) === "0"){
          this.props.arSceneNavigator.viroAppProps.propsFromGame.setTheWinner(this.state.player2Id, this.state.player1Id)
          this.props.arSceneNavigator.viroAppProps.propsFromGame.setDataFromGame(this.state.player2Id)
        } else if (snapshot.val().status === "gameEnd" &&  String(snapshot.val().p2.monster.health) === "0") {
          this.props.arSceneNavigator.viroAppProps.propsFromGame.setTheWinner(this.state.player1Id, this.state.player2Id)
          this.props.arSceneNavigator.viroAppProps.propsFromGame.setDataFromGame(this.state.player1Id)
        }

        if(this.state.player1HP !== this.state.player1OldHp){
          this.setState({
            statusParticleOne: true,
            statusParticleOneAttack: false,
            statusParticleTwo: false,
            statusParticleTwoAttack: true,
          })
        } 
        
        if(this.state.player2HP !== this.state.player2OldHp){
          this.setState({
            statusParticleOne: false,
            statusParticleOneAttack: true,
            statusParticleTwo: true,
            statusParticleTwoAttack: false,
          })
        }

        this.setState({
          player1HP: String(snapshot.val().p1.monster.health),
          player2HP: String(snapshot.val().p2.monster.health),
          allPositionDragon: snapshot.val().allPos
        });

    });
 
  }

  shieldOnloadStart = () => {
    this.setState({
      welcomeText :"PLEASE WAIT"
    })
  }

  shieldOnloadEnd = () => {
    this.setState({
      welcomeText : "TOUCH THE MAGICIAL SHIELD BELOW"
    })
  }

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
      
        <ViroAmbientLight color={"#aaaaaa"} />
      
          <ViroNode 
            position={[0, 0, -.4]}
            visible={this.state.statusPortal}
          >
            <ViroText 
              text={this.state.welcomeText}
              textLineBreakMode="wordwrap"
              position={[0,.15,0]}
              scale={[.1, .1, .1]} 
              width={3} 
              height={2}
              style={styles.getStartedTextStyle} />
            
            <ViroAmbientLight color="#ffffff" intensity={200}/>

            <Viro3DObject
              visible={this.state.statusShield}
              source={require('./res/start_game/Wonder_Woman_V_Shield.obj')}
              resources={[require('./res/start_game/Wonder_Woman_V_Shield.mtl')]}
              scale={[.2, .2, .2]}
              onLoadStart={this.shieldOnloadStart}
              onLoadEnd={this.shieldOnloadEnd}
              onClick={() => this.setState({playerReady: true, portalSound: true, statusShield: false, welcomeText: 'OPENING THE PORTAL'})}
              type="OBJ" />
          </ViroNode>

          <ViroAmbientLight color="#ffffff" intensity={200}/>
          
          
          {this.state.playerReady && this.loadPortal()}
  
      </ViroARScene>
    );
  }

  loadPortal = () => {

      return (
          <ViroPortalScene passable={true}>

              <ViroPortal position={[0, 0, -.5]} scale={[.2, .2, .2]} dragType="FixedDistance" onDrag={()=>{}}>
                <Viro3DObject source={require('./res/portal_res/portal_ship/portal_ship.vrx')}
                  resources={[require('./res/portal_res/portal_ship/portal_ship_diffuse.png'),
                              require('./res/portal_res/portal_ship/portal_ship_normal.png'),
                              require('./res/portal_res/portal_ship/portal_ship_specular.png')]}
                  type="VRX"
                  onLoadEnd={ () => this.actionAfterLoadPortal()}/>
              </ViroPortal>
              <Viro360Image source={require("./res/portal_res/arena_360.jpg")} />

            <ViroText 
              text={this.state.summoningDragonText}
              visible={this.state.statusSummonDragons}
              textLineBreakMode="wordwrap"
              position={[0,.15,-5]}
              scale={[.1, .1, .1]} 
              width={3} 
              height={2}
              style={styles.getStartedTextStyle} />
              
            <ViroNode
              position={this.state.allPositionDragon}
            >
              { this.playerOne() }
              { this.playerTwo() }
            </ViroNode>
        
          </ViroPortalScene>
          
      )
  }

  playerOne = () => {

      return (
        <ViroNode 
          position={this.state.player1Position} 
          scale={[0.8, 0.8, 0.8]}
          animation={{name: "playerMove", run: true, loop: true}}
        >
          <Viro3DObject
            source={this.state.playerOneObject}
            resources={this.state.playerOneObjectTexture}
            position={[0, -1, 0]}
            rotation={[0, 90, 0]}
            scale={[0.3, 0.3, 0.3]}
            onClick={this.attackPlayerOne}
            onLoadEnd={this.onloadPlayerEnd}
            type="VRX"
            />

            <ViroNode
              position={[.6, .4, 0]}
            >
              <ViroText 
                text={this.state.player1Name} 
                visible={this.state.statusPlayerReady}
                scale={[.5, .5, .5]} 
                width={8} height={8}
                style={styles.playerNameStyle} />

              <ViroText 
                text={this.state.player1HP} 
                visible={this.state.statusPlayerReady}
                scale={[.5, .5, .5]}
                position={[0, -.5, 0]} 
                width={8} height={8}
                style={styles.playerNameStyle} />

            </ViroNode>
  
          { this.particleEmitterAttackOne() }
          { this.particleOne() }
         

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
          
        </ViroNode>    
      )
  }

  playerTwo = () => {
    
    return (
      <ViroNode 
        position={this.state.player2Position} 
        scale={[0.8, 0.8, 0.8]}
        animation={{name: "playerMove", run: true, loop: true}}
      >
        <Viro3DObject
          source={this.state.playerTwoObject}
          resources={this.state.playerTwoObjectTexture}
          position={[0, -1, 0]}
          rotation={[0, -90, 0]}
          scale={[0.3, 0.3, 0.3]}
          onClick={this.attackPlayerTwo}
          onLoadEnd={this.onloadPlayerEnd}
          type="VRX"
          />

        <ViroNode
          position={[-.6, -.4, 0]}
        >
          <ViroText
            text={this.state.player2Name} 
            visible={this.state.statusPlayerReady}
            scale={[.5, .5, .5]} 
            width={8} height={8}
            style={styles.playerNameStyle} />

            <ViroText 
            text={this.state.player2HP} 
            visible={this.state.statusPlayerReady}
            scale={[.5, .5, .5]}
            position={[0, -.5, 0]} 
            width={8} height={8}
            style={styles.playerNameStyle} />
        </ViroNode>
    
        {this.particleEmitterAttackTwo()}
        {this.partilceTwo()}

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
      
      </ViroNode>  
    )          

  }

  particleOne = () => {
    return (
      <ViroNode 
        position={[-.2, 3, 0]} 
        scale={[1, 1, 1]} 
        visible={this.state.player1Status}
        >

        <ViroParticleEmitter
          duration={1200}
          run={this.state.statusParticleOne}
          fixedToEmitter={false}

          image={{
            source:this.state.playerOneTexture,
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
    )
  }

  partilceTwo = () => {
    return (
      <ViroNode 
      position={[-.2, 3, 0]} 
      scale={[1, 1, 1]} 
      visible={this.state.player2Status}
      >

      <ViroParticleEmitter
        duration={1200}
        run={this.state.statusParticleTwo}
        fixedToEmitter={false}

        image={{
          source: this.state.playerTwoTexture,
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
    )
  }

  particleEmitterAttackOne = () => {
    return (
      <ViroNode 
        position={[5.4, 2.55, 0]}
      >
      <ViroParticleEmitter
          scale={[3, .7, .2]}
          duration={1100}
          delay={1100}
          visible={true}
          run={this.state.statusParticleOneAttack}
          fixedToEmitter={true}

          image={{
            source:this.state.playerTwoTexture,
            height:1,
            width:1,
          }}

          spawnBehavior={{
            particleLifetime:[500,500],
            emissionRatePerSecond:[200,200],
            maxParticles:200,
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
            velocity:{initialRange:[[2,2,0], [2,-2,0]]},
            acceleration:{initialRange:[[0,0,0], [0,0,0]]}
          }}
        />
      </ViroNode>
    )
  }

  particleEmitterAttackTwo = () => {
    return (
      <ViroNode 
        position={[-5.4, 2.55, 0]}
      >
      <ViroParticleEmitter
        scale={[3, .7, .2]}
        duration={1100}
        delay={1100}
        visible={true}
        run={this.state.statusParticleTwoAttack}
        fixedToEmitter={true}

        image={{
          source:this.state.playerOneTexture,
          height:1,
          width:1,
        }}

        spawnBehavior={{
          particleLifetime:[500,500],
          emissionRatePerSecond:[200,200],
          maxParticles:200,
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
          velocity:{initialRange:[[-2,2,0], [-2,-2,0]]},
          acceleration:{initialRange:[[0,0,0], [0,0,0]]}
        }}
      /> 
      </ViroNode>
    )
  }

}

var styles = StyleSheet.create({
  getStartedTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#000',
    fontWeight: '500',
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


// dragType="FixedDistance" onDrag={()=>{}}
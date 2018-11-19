<ViroNode 
  position={[4, 0, -14]} 
  scale={[0.8, 0.8, 0.8]}
  animation={{name: "playerTwoMove", run: true, loop: true}}
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

  <ViroNode 
    position={[-.2, 3, 0]} 
    scale={[1, 1, 1]} 
    visible={this.state.playerTwo.status}>

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



   <ViroNode 
            position={[-4, 0, -14]} 
            scale={[0.8, 0.8, 0.8]}
            animation={{name: "playerMove", run: true, loop: true}}>

              <ViroText
                text={players[0].name}
                position={[0, 2, 0]}
                scale={[.1, .1, .1]} 
                width={2} height={2}
                style={styles.getStartedTextStyle}
              />

              <Viro3DObject
                source={require('./res/heroes/pokemon/Mew.vrx')}
                position={[0, 2, 0]}
                rotation={[0, 0, 0]}
                scale={[0.1, 0.1, 0.1]}
                onLoadEnd={this.setPlayerLose}
                type="VRX"
                />
          </ViroNode>


  
</ViroNode>



       
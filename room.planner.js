class RoomPlanner {
  constructor(roomName, options) {
    this.roomName = roomName
    this.room = Game.rooms[roomName]

    if (!Memory.rooms[roomName]) {
      Memory.rooms[roomName] = {}
    }

    if (!Memory.rooms[roomName].roomPlanner) {
      Memory.rooms[roomName].roomPlanner = {}
    }

    this.memory = Memory.rooms[roomName].roomPlanner

    this.run()
  }

  designLabs(position) {
    const labsDesign = [
      ['', '🔬', '🔬', '.'],
      ['🔬', '🔬', '.', '🔬'],
      ['🔬', '.', '🔬', '🔬'],
      ['.', '🔬', '🔬', ''],
    ]

    for (let x = 0; x < labsDesign.length; x++) {
      for (let y = 0; y < labsDesign[x].length; y++) {
        Game.rooms[this.roomName].visual.text(labsDesign[y][x] || '',
          position.x + x, position.y + y, {
          color: 'white',
          font: 0.5
        })
      }
    }
  }

  designStorage(position) {
    const storageDesign = [
      ['', '', '.', '', ''],
      ['', '.', '⚬', '.', ''],
      ['.', '⚬', '⚬', '⚬', '.'],
      ['', '.', '⚬', '.', ''],
      ['', '', '.', '', '']
    ]

    for (let x = 0; x < storageDesign.length; x++) {
      for (let y = 0; y < storageDesign[x].length; y++) {
        Game.rooms[this.roomName].visual.text(storageDesign[y][x] || '',
          position.x + x, position.y + y, {
          color: 'white',
          font: 0.5
        })
      }
    }
  }

  designCore(position) {
    const coreDesign = [
      ['', '.', '.', '.', '.', '.', ''],
      ['.', '⚬', '⚬', '⚬', '⚬', '⚬', '.'],
      ['.', '⭕', '⚡', '⚬', '⚡', '⭕', '.'],
      ['.', '⊔', '⚬', '🔗', '⚬', '⊔', '.'],
      ['.', '⚬', '⚡', '⚬', '⚡', '⚬', '.'],
      ['.', '⚬', '⚬', '⭕', '⚬', '⚬', '.'],
      ['', '.', '.', '.', '.', '.', '']
    ]

    for (let x = 0; x < coreDesign.length; x++) {
      for (let y = 0; y < coreDesign[x].length; y++) {
        Game.rooms[this.roomName].visual.text(coreDesign[y][x] || '',
          position.x + x, position.y + y, {
          color: 'white',
          font: 0.5
        })
      }
    }
  }

  showAvailableSports() {
    const sources = this.room.find(FIND_SOURCES)
    if (sources.length) {
      for (const source of sources) {
        const positions = source.pos.getOpenPositions()
        for (const position of positions) {
          Game.rooms[this.roomName].visual.circle(position.x, position.y, {
            fill: 'transparent',
            radius: 0.15,
            stroke: '#551887'
          })
        }
      }
    }
  }

  showBuildableArea() {
    const terrain = new Room.Terrain(this.roomName);
    const sources = this.room.find(FIND_SOURCES)
    for (let x = 1; x < 49; x++) {
      for (let y = 1; y < 49; y++) {
        const terrainData = terrain.get(x, y)
        const isWall = terrainData !== TERRAIN_MASK_WALL
        if (!sources.length) { return }
        if (isWall) {
          Game.rooms[this.roomName].visual.circle(x, y, {
            fill: 'transparent',
            radius: 0.15,
            stroke: 'green'
          })
        }
      }
    }
  }

  run() {
    this.designCore({
      x: 25,
      y: 25
    })

    this.designStorage({
      x: 19,
      y: 25
    })

    this.designLabs({
      x: 14,
      y: 25
    })

    //this.showAvailableSports()

    //this.showBuildableArea()

    // const fistSpawn = Game.rooms[this.roomName].find(FIND_STRUCTURES, {
    //   filter: { structureType: STRUCTURE_SPAWN }
    // })

    // const sources = this.room.find(FIND_SOURCES)
    // let path = PathFinder.search(sources)
    // console.log('path: ', JSON.stringify(path));
    // if (sources.length) {
    //   for (const source of sources) {
    //     const positions = source.pos.getOpenPositions()
    //     if (positions.length >= 2) {
    //       Game.rooms[this.roomName].visual.circle(positions[0].x, positions[0].y, {
    //         fill: 'transparent',
    //         radius: 0.15,
    //         stroke: '#0Ff'
    //       })
    //     } else {

    //     }
    //     for (const position of positions) {
    //       Game.rooms[this.roomName].visual.circle(position.x, position.y, {
    //         fill: 'transparent',
    //         radius: 0.15,
    //         stroke: 'red'
    //       })
    //     }
    //   }
    // }

    // const exits = [];
    // const terrain = new Room.Terrain(this.roomName);
    // for (let x = 0; x < 50; x++) {
    //   for (let y = 0; y < 50; y++) {
    //     const terrainData = terrain.get(x, y)
    //     //console.log('terrainData: ', terrainData);
    //     if (terrainData !== TERRAIN_MASK_WALL && (x === 0 || x === 49 || y === 0 || y === 49)) {
    //       // Game.rooms[this.roomName].visual.circle(x, y, {
    //       //   fill: 'transparent',
    //       //   radius: 0.15,
    //       //   stroke: 'green'
    //       // })
    //     }
    //   }
    // }
  }
}

module.exports = RoomPlanner

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

/*
const cleanup = () => {
  if (Game.time % 16 === 7) {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }
  }
}

module.exports = {
  loop: () => {
    _.each(Game.rooms, (room) => {
      if (room.isMine()) {
        // Defend controller
        const controller = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTROLLER}})[0]
        const controllerPositions = controller.pos.getOpenPositions()
        for (const controllerPosition of controllerPositions) {
          Game.rooms[room.name].visual.circle(controllerPosition.x, controllerPosition.y, {
            fill: 'transparent',
            radius: 0.15,
            stroke: 'yellow'
          })
        }

        // Map Core design
        // ⚬ = Extend
        // ⭕ = Spawn
        // ⊔ = Storage
        // ⚡ = Carry Creep
        // . = Path
        if (room.find(FIND_MY_SPAWNS).length) {
          const coreDesign = [
            ['', '.', '.', '.', '.', '.', ''],
            ['.', '⚬', '⚬', '⚬', '⚬', '⚬', '.'],
            ['.', '⭕', '⚡', '⚬', '⚡', '⭕', '.'],
            ['.', '⊔', '⚬', '🔗', '⚬', '⊔', '.'],
            ['.', '⚬', '⚡', '⚬', '⚡', '⚬', '.'],
            ['.', '⚬', '⚬', '⭕', '⚬', '⚬', '.'],
            ['', '.', '.', '.', '.', '.', '']
          ]

          const position = room.find(FIND_MY_SPAWNS)[0].pos
          //console.log(JSON.stringify(position, null, 2))
          for (let x = 0; x < coreDesign.length; x++) {
            for (let y = 0; y < coreDesign[x].length; y++) {
              Game.rooms[room.name].visual.text(coreDesign[y][x] || '',
                position.x + x, position.y + y, {
                color: 'white',
                font: 0.5
              })
            }
          }
        }
      }

      // Buildable area
      // const terrain = new Room.Terrain(room.name);
      // for (let x = 1; x < 49; x++) {
      //   for (let y = 1; y < 49; y++) {
      //     const terrainData = terrain.get(x, y)
      //     const isWall = terrainData === TERRAIN_MASK_WALL
      //     if (!isWall) {
      //       Game.rooms[room.name].visual.circle(x, y, {
      //         fill: 'transparent',
      //         radius: 0.15,
      //         stroke: 'green'
      //       })
      //     }
      //   }
      // }

      // Sources
      const sources = room.find(FIND_SOURCES)
      if (sources.length) {
        for (const source of sources) {
          const positions = source.pos.getOpenPositions()
          for (const position of positions) {
            Game.rooms[room.name].visual.circle(position.x, position.y, {
              fill: 'transparent',
              radius: 0.15,
              stroke: '#551887'
            })
          }
        }
      }

      // Wall
      const exits = room.find(FIND_EXIT)
      if (exits.length) {
        for (const exit of exits) {
          const positions = getOpenPositions(exit)
          for (const position of positions) {
            if (position.x !== exit.x && position.y !== exit.y) {
              Game.rooms[room.name].visual.circle(position.x, position.y, {
                fill: 'transparent',
                radius: 0.15,
                stroke: 'yellow'
              })
            }
          }
        }
      }

    })
    cleanup()
  }
}

Room.prototype.isMine = function (allowReserved) {
  if (!this.controller) { return false }
  if (this.controller.my) { return true }

  if (!allowReserved) { return false }
  if (!this.controller.reservation) { return false }
  if (this.controller.reservation.username === _.sample(Game.spawns).owner.username) {
    return true
  }

  return false
}

function getNearbyPositions(pos) {
  const positions = []

  let startX = pos.x !== 0 ? pos.x - 1 || 1 : 0
  let startY = pos.y !== 0 ? pos.y - 1 || 1 : 0

  for (let x = startX; x <= pos.x + 1 && x < 49; x++) {
    for (let y = startY; y <= pos.y + 1 && y < 49; y++) {
      if (x !== pos.x || y !== pos.y) {
        positions.push(new RoomPosition(x, y, pos.roomName))
      }
    }
  }

  return positions
}

RoomPosition.prototype.getNearbyPositions = function () {
  return getNearbyPositions(this)
}

function getOpenPositions(pos) {
  const nearbyPositions = getNearbyPositions(pos)

  const terrain = new Room.Terrain(pos.roomName);
  return _.filter(nearbyPositions, (position) => {
    return terrain.get(position.x, position.y) !== TERRAIN_MASK_WALL
  })
}

RoomPosition.prototype.getOpenPositions = function () {
  return getOpenPositions(this)
}
*/

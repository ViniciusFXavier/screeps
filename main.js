require('./prototype.room')
require('./prototype.roomPosition')

const { Screeps, priorities }= require('./screeps');
global.screeps = new Screeps()

const InitProcess = require('./process.init');
const CreepsProcess = require('./process.creeps');

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
    if (!Game.cpu.limit) {
      Game.cpu.limit = 20
    }

    screeps.run()
    cleanup()

    screeps.runProcess('init', InitProcess, {
      priority: priorities.ALWAYS,
      debug: true
    })

    screeps.runProcess('creeps', CreepsProcess, {
      priority: priorities.ALWAYS
    })
  }
}

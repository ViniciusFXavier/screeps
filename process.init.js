const Process = require('./process');
const RoomPlanner = require('./room.planner');

class InitProcess extends Process {
  constructor (data) {
    super(data)
  }

  run() {
    _.each(Game.rooms, (room) => {
      if (room.isMine()) {
        room.roomPlanner = new RoomPlanner(room.name, this.data);
      }
    })
  }
}

module.exports = InitProcess

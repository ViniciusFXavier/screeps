RoomPosition.prototype.getNearbyPositions = function () {
  const positions = []

  let startX = this.x - 1 || 1
  let startY = this.y - 1 || 1

  for (let x = startX; x <= this.x + 1 && x < 49; x++) {
    for (let y = startY; y <= this.y + 1 && y < 49; y++) {
      if (x !== this.x || y !== this.y) {
        positions.push(new RoomPosition(x, y, this.roomName))
      }
    }
  }

  return positions
}

RoomPosition.prototype.getOpenPositions = function () {
  const nearbyPositions = this.getNearbyPositions()

  const terrain = new Room.Terrain(this.roomName);
  return _.filter(nearbyPositions, (position) => {
    return terrain.get(position.x, position.y) !== TERRAIN_MASK_WALL
  })
}

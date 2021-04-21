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
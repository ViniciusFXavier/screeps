'use strict'

const priorities = Object.freeze({
  LOW: 1,
  DEFAULT: 2,
  HIGH: 3,
  ALWAYS: 10
})

const priorityEffects = {
  [priorities.LOW]: {
    throttleAt: 9500,
    stopAt: 5000,
  },
  [priorities.DEFAULT]: {
    throttleAt: 8000,
    stopAt: 3000,
  },
  [priorities.HIGH]: {
    throttleAt: 5000,
    stopAt: 500,
  },
  [priorities.ALWAYS]: {
    throttleAt: 0,
    stopAt: 0,
  },
}

class Screeps {
  constructor() {
    if (!Memory.screeps) {
      Memory.screeps = { process: {} }
    }

    if (!Memory.rooms) {
      Memory.rooms = {};
    }

    this.memory = Memory.screeps
  }

  run() {
    this.bucket = Game.cpu.bucket
    this.currentProcess = null

    this.memory = Memory.screeps
  }

  runProcess(id, ProcessConstructor, options) {
    const stats = this.initializeProcessStats(id)
    const process = new ProcessConstructor(options, stats)

    if (this.isProcessAllowedToRun(stats, options)) {
      const previousProcess = this.currentProcess
      this.currentProcess = process
      this.timeProcess(id, stats, () => process.run(options))
      this.currentProcess = previousProcess
    }
  }

  initializeProcessStats(id) {
    if (!this.memory.process[id]) {
      this.memory.process[id] = { lastRun: 0 }
    }

    return this.memory.process[id]
  }

  isProcessAllowedToRun(stats, options) {
    let interval = options.interval || 1
    const priority = options.priority || priorities.DEFAULT
    const stopAt = options.stopAt || priorityEffects[priority].stopAt || 0
    const throttleAt = options.throttleAt || priorityEffects[priority].throttleAt || 0

    if (this.bucket <= stopAt) {
      return false
    }

    if (interval === 0 || priority === priorities.ALWAYS) {
      return true
    }

    interval *= this.getThrottleMultiplier(stopAt, throttleAt)

    return Game.time - stats.lastRun > interval
  }

  timeProcess(id, stats, process) {
    const prevRunTime = stats.lastRun
    stats.lastRun = Game.time
    const cpuBefore = Game.cpu.getUsed()
    process()
    const cpuUsage = Game.cpu.getUsed() - cpuBefore
    this.memory.process[id].cpu = ((this.memory.process[id].cpu || cpuUsage) * 0.99) + (cpuUsage * 0.01)
    if (prevRunTime === Game.time) {
      this.memory.process[id].lastCpu += cpuUsage
    } else {
      this.memory.process[id].lastCpu = cpuUsage
    }
  }

  getThrottleMultiplier (stopAt, throttleAt) {
    let throttling = Math.max(this.cpuUsage, 1)

    const minThrottle = Game.cpu.limit / 2
    const maxThrottle = Game.cpu.tickLimit
    if (Game.cpu.getUsed() > minThrottle) {
      throttling /= 1 - ((Game.cpu.getUsed() - minThrottle) / (maxThrottle - minThrottle))
    }

    if (!stopAt) { stopAt = 0 }
    if (!throttleAt) { throttleAt = 5000 }
    if (this.bucket <= stopAt) { return 99999 }
    if (this.bucket < throttleAt) {
      throttling *= (throttleAt - stopAt) / (this.bucket - stopAt)
    }

    return throttling
  }
}

module.exports = {
  priorities,
  Screeps
}

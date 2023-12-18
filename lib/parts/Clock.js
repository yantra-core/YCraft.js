// TODO: WIP

import { Part } from '../Part.js';

export default class Clock extends Part {
  constructor(interval = 1000) { // Default interval of 1000 milliseconds (1 second)
    super();
    this.interval = interval;
    this.clockTimer = null;
    this.isTicking = false;
  }

  // Start the clock
  start() {
    if (!this.isTicking) {
      this.clockTimer = setInterval(() => {
        this.emit('tick');
      }, this.interval);
      this.isTicking = true;
    }
  }

  // Stop the clock
  stop() {
    if (this.isTicking) {
      clearInterval(this.clockTimer);
      this.clockTimer = null;
      this.isTicking = false;
    }
  }

  // Set a new interval for the clock
  setInterval(newInterval) {
    this.interval = newInterval;
    if (this.isTicking) {
      this.stop();
      this.start();
    }
  }
}

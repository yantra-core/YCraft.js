import { Part } from '../Part.js';

class Train extends Part {
  static type = 'Train';

  constructor(x = 0, y = 0, z = 0, { velocity = 5, cargo = [], track = null } = {}) {
    super(x, y, z);
    this.type = Train.type;
    this.velocity = velocity; // Positive for forward, negative for reverse
    this.cargo = cargo; // Array of CargoSignal objects
    this.track = track; // Optional Track object the Train is on
    this.connectedParts = []; // Parts connected to the train
    this.isOn = false; // Indicates whether the train is moving
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  receive(signal) {
    console.log("Train received signal", signal);
    this.signal = signal;
    this.toggle();
  }

  toggle() {
    this.isOn = !this.isOn;
    if (this.isOn) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    this.emit('start');
    // Logic to start moving the train, perhaps initiating a movement loop or sequence
  }

  stop() {
    this.emit('stop');
    // Logic to stop the train, like clearing intervals or stopping movement updates
  }

  move() {
    if (!this.isOn) return; // Only move if the train is on

    if (this.track) {
      // Move along the track
      // Update position based on track layout and velocity
    } else {
      // Move freely if not on a track
      this.position.x += this.velocity;
    }
    this.emit('move', this.position);
  }

  // Additional methods as needed...
}

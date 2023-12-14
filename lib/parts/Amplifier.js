import { Part } from '../Part.js';

export default class Amplifier extends Part {
  constructor(x = 0, y = 0, z = 0, { amplitude = 2 } = {}) {
    super(x, y, z);
    this.connectedParts = [];
    this.amplitude = amplitude;
  }

  connect(component) {
    this.connectedParts.push(component);
  }

  receive(signal) {
    signal.current = signal.current * this.amplitude;
    console.log('sending along', signal)
    // Transmit the amplified signal
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

  // Optional: Add an update() method if the Amplifier has dynamic behavior
  update() {
    // Update logic for the Amplifier, if any
  }
}

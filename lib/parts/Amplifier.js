import EventEmitter from '../utils/EventEmitter.js';

export default class Amplifier extends EventEmitter {
  constructor({ amplitude = 2 } = {}) {
    super();
    this.connectedComponents = [];
    this.amplitude = amplitude;
  }

  connect(component) {
    this.connectedComponents.push(component);
  }

  receive(signal) {
    signal.current = signal.current * this.amplitude;
    console.log('sending along', signal)
    // Transmit the amplified signal
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedComponents.forEach(component => {
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

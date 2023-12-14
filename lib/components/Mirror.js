import EventEmitter from '../utils/EventEmitter.js';

export default class Mirror extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    this.orientation = 0; // Represents the angle or orientation of the mirror
  }

  connect(component) {
    this.connectedComponent = component;
  }

  setOrientation(angle) {
    this.orientation = angle;
  }

  receive(signal) {
    console.log('sss', signal)
    // Check if the signal is a laser signal
    if (signal.constructor.name === 'LightSignal') {
      console.log(`Mirror: Reflecting laser at orientation ${this.orientation} degrees.`);
      if (this.connectedComponent) {
        // Modify the signal as needed based on the mirror's properties
        const reflectedSignal = { ...signal, direction: this.calculateReflectionDirection(signal.direction) };
        console.log('rrr', reflectedSignal)
        this.connectedComponent.receive(reflectedSignal);
      }
    }
  }

  calculateReflectionDirection(incomingDirection) {
    console.log('incomingDirection', incomingDirection, this.orientation)
    // Simplified example of calculating reflection direction based on mirror orientation
    return (incomingDirection + 2 * this.orientation) % 360;
  }
}

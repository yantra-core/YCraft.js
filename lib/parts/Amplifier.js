import { Part } from '../Part.js';

export default class Amplifier extends Part {

  static type = 'Amplifier';

  constructor(x = 0, y = 0, z = 0, { amplitude = 2 } = {}) {
    if (typeof x === 'object') {
      amplitude = x.amplitude || amplitude;
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }

    super(x, y, z);
    this.type = Amplifier.type;
    this.connectedParts = [];
    this.amplitude = amplitude;
  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  receive(signal) {
    signal.current = signal.current * this.amplitude;
    // console.log('sending along', signal)
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

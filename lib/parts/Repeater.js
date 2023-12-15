import { Part } from '../Part.js';

export default class Repeater extends Part {

  static type = 'Repeater';
  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = Repeater.type;
    this.connectedParts = [];
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  receive(signal) {
    this.transmit(signal);
  }

  transmit(signal) {
    this.emit('repeat', signal);
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

  // Optional: Add an update() method if the Repeater has dynamic behavior
  update() {
    // Update logic for the Repeater, if any
  }
}

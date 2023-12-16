import { Part } from '../Part.js';

export default class Relay extends Part {
  static type = 'Relay';

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = Relay.type;
    // Use arrays to manage multiple connections
    this.inputs = [];
    this.outputs = [];
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.outputs.push(component);
  }

  /*
  connectOutput(component) {
    if (!this.outputs.includes(component)) {
      this.outputs.push(component);
      if (component.inputs) {
        component.inputs.push(this); // Bidirectional connection
      }
    }
  }
  */

  // The receive method now needs to handle signals from multiple inputs
  receive(signal) {
    // Handle the received signal, possibly with input-specific logic
    this.transmit(signal);
  }

  // Transmit signal to all connected outputs
  transmit(signal) {
    this.emit('transmit', signal); // Emitting a 'relay' event instead of 'repeat'
    this.outputs.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

  // If Relay has dynamic behavior, include the update logic
  update() {
    // Implement any update logic for the Relay
  }
}

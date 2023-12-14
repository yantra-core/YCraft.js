import EventEmitter from '../utils/EventEmitter.js';

export default class Repeater extends EventEmitter {
  constructor() {
    super();
    this.connectedParts = [];
  }

  connect(component) {
    this.connectedParts.push(component);
  }

  receive(signal) {
    this.transmit(signal);
  }

  transmit(signal) {
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

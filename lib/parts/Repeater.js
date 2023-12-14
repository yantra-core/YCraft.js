import EventEmitter from '../utils/EventEmitter.js';

export default class Repeater extends EventEmitter {
  constructor() {
    super();
    this.connectedComponents = [];
  }

  connect(component) {
    this.connectedComponents.push(component);
  }

  receive(signal) {
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedComponents.forEach(component => {
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

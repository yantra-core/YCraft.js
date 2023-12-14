import EventEmitter from '../utils/EventEmitter.js';

export default class Wire extends EventEmitter {
  constructor() {
    super();
    this.connectedComponents = [];
  }

  connect(component) {
    this.connectedComponents.push(component);
  }

  receive(signal) {
    // The Wire receives a signal and then transmits it to all connected components
    this.transmit(signal);
  }

  transmit(signal) {
    // Transmit signal to all connected components
    this.connectedComponents.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }
}

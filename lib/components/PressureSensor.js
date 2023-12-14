import EventEmitter from '../utils/EventEmitter.js';

export default class PressureSensor extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    this.voltage = 1;
  }

  connect(component) {
    this.connectedComponent = component;
  }

  trigger() {
    if (this.connectedComponent) {
      this.emit('activate', this.voltage);
      // Emit signal to the connected component (Wire)
      this.connectedComponent.transmit(this.voltage);
    }
  }

  receive(signal) {
    // Handle received signal if needed
  }
}

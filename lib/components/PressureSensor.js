import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class PressureSensor extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    this.signal = new ElectricalSignal();
    
  }

  connect(component) {
    this.connectedComponent = component;
  }

  trigger(signal = this.signal) {
    if (this.connectedComponent) {
      // Emit signal to the connected component (Wire)
      this.connectedComponent.transmit(signal);
    }
  }

  receive(signal) {
    // Handle received signal if needed
  }
}

import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class PressureSensor extends EventEmitter {
  constructor() {
    super();
    this.connectedParts = []; // Changed to an array to hold multiple connections
    this.signal = new ElectricalSignal();
  }

  connect(component) {
    this.connectedParts.push(component); // Add the component to the array of connected parts
  }

  trigger(signal = this.signal) {
    // Emit signal to all connected components
    this.connectedParts.forEach(component => {
      if (component.receive && typeof component.receive === 'function') {
        component.receive(signal);
      }
    });
  }

  receive(signal) {
    // Handle received signal if needed
    // This can be left empty or filled with logic as needed
  }
}
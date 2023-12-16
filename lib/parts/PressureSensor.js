import ElectricalSignal from '../signals/ElectricalSignal.js';
import { Part } from '../Part.js';

export default class PressureSensor extends Part {

  static type = 'PressureSensor';

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = PressureSensor.type;
    this.connectedParts = []; // Changed to an array to hold multiple connections
    this.signal = new ElectricalSignal();
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }
  
  trigger(signal = this.signal) {
    // Emit signal to all connected components
    this.emit('trigger', signal);
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
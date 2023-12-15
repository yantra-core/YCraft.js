import {Part} from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';
export default class MotionDetector extends Part {

  static type = 'MotionDetector';

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = MotionDetector.type;
    this.isConnected = false;
    this.connectedParts = [];
  }

  connect(component) {
    this.isConnected = true;
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  detectMotion() {
    if (this.isConnected) {
      // Create an ElectricalSignal instance for USB data transmission
      const signal = new ElectricalSignal({ voltage: 5 }); // Example base voltage
      signal.encodeUSB(1); // Encoding a binary '1' to indicate motion detection
      console.log('Motion detected!');
      this.transmit(signal);
      this.emit('motion')
    } else {
      console.log('Motion detector is not connected to any component.');
    }
  }

  transmit(signal) {
    this.connectedParts.forEach(component => {
      if (typeof component.receive === 'function') {
        component.receive(signal);
      }
    });
  }

  // Optional: Add update method for dynamic behavior, e.g., periodically checking for motion
  update() {
    // Logic to periodically check for motion
  }
}

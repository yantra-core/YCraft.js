import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../ElectricalSignal.js';
export default class MotionDetector extends EventEmitter {
  constructor() {
    super();
    this.isConnected = false;
    this.connectedComponents = [];
  }

  connect(component) {
    this.connectedComponents.push(component);
    this.isConnected = true;
  }

  detectMotion() {
    if (this.isConnected) {
      // Create an ElectricalSignal instance for USB data transmission
      const signal = new ElectricalSignal({ voltage: 5 }); // Example base voltage
      signal.encodeUSB(1); // Encoding a binary '1' to indicate motion detection
      console.log('Motion detected!');
      this.transmit(signal);
    } else {
      console.log('Motion detector is not connected to any component.');
    }
  }

  transmit(signal) {
    this.connectedComponents.forEach(component => {
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

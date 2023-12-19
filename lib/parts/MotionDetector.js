import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class MotionDetector extends Part {
  static type = 'MotionDetector';

  constructor(x = 0, y = 0, z = 0, { motionTimeout = 4000, debounceDelay = 500 } = {}) {
    super(x, y, z);
    this.type = MotionDetector.type;
    this.isConnected = false;
    this.connectedParts = [];
    this.motionTimeout = motionTimeout; // Time in milliseconds to wait before emitting 'still' after motion
    this.debounceDelay = debounceDelay; // Delay for debounce mechanism
    this.lastMotionTime = 0; // Track the last time motion was detected
    this.motionTimer = null; // Timer for 'still' event

    this.onFn = this.detectMotion.bind(this);
    this.offFn = () => {};
  }

  connect(component) {
    this.isConnected = true;
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  detectMotion() {
    const currentTime = Date.now();
    
    // Debounce check
    if (currentTime - this.lastMotionTime < this.debounceDelay) {
      return; // Too soon since last motion, ignore this trigger
    }

    this.lastMotionTime = currentTime;

    if (this.isConnected) {
      const signal = new ElectricalSignal({ voltage: 5 });
      signal.encodeUSB(1); // Encoding binary '1' to indicate motion
      console.log('Motion detected!');
      this.transmit(signal);
      this.emit('motion', signal);

      // Reset and start the timer for 'still' event
      clearTimeout(this.motionTimer);
      this.motionTimer = setTimeout(() => {
        this.emit('still');
      }, this.motionTimeout);

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

  update() {
    // Optional: Implement logic for periodic motion checks or other behaviors
  }
}

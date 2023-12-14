import EventEmitter from '../utils/EventEmitter.js';

export default class Actuator extends EventEmitter {

  constructor() {
    super();
    this.isActive = false;
    this.connectedParts = [];
  }

  connect(component) {
    this.connectedParts.push(component);
  }

  receive(signal) {
    this.signal = signal;
    if (this.isActive) {
      this.isActive = false;
      this.emit('deactivated');
    } else {
      this.isActive = true;
      this.emit('activated');
    }
  }

  update() {
    // Check if the actuator is active and perform actions accordingly
    if (this.isActive) {
      // For example, activate connected components
      this.connectedParts.forEach(comp => comp.receive(this.signal));
    }
  }

}

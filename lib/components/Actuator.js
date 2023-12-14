import EventEmitter from '../utils/EventEmitter.js';

export default class Actuator extends EventEmitter {

  constructor() {
    super();
    this.isActive = false;
    this.connectedComponents = [];
  }

  connect(component) {
    this.connectedComponents.push(component);
  }

  receive(signal) {
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
      this.connectedComponents.forEach(comp => comp.receive('activate'));
    }
  }

}

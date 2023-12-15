
import { Part } from '../Part.js';

export default class Actuator extends Part {

  static type = 'Actuator';

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = Actuator.type;
    this.isActive = false;
    this.connectedParts = [];
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
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

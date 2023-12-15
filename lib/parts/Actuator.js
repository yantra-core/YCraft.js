import { Part } from '../Part.js';

export default class Actuator extends Part {

  static type = 'Actuator';

  constructor(x = 0, y = 0, z = 0, { frequency = 1000 } = {} ) { // frequency in milliseconds
    super(x, y, z);
    this.type = Actuator.type;
    this.isActive = false;
    this.frequency = frequency;
    this.pulseTimer = null;
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
    this.toggleState();
  }

  toggleState() {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.startPulsing();
      this.emit('activate');
    } else {
      this.stopPulsing();
      this.emit('deactivate');
    }
  }

  startPulsing() {
    if (this.pulseTimer === null) {
      this.pulseTimer = setInterval(() => {
        this.update();
      }, this.frequency);
    }
  }

  stopPulsing() {
    if (this.pulseTimer !== null) {
      clearInterval(this.pulseTimer);
      this.pulseTimer = null;
    }
  }

  update() {
    if (this.isActive) {
      // Perform actions while the actuator is active
      this.connectedParts.forEach(comp => comp.receive(this.signal));
    }
  }

}

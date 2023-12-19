import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Latch extends Part {
  static type = 'Latch';

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = Latch.type;
    this.connectedParts = [];
    this.signal = new ElectricalSignal();
    this.isLatched = false; // State of the latch

    this.onFn = this.engage.bind(this);
    this.offFn = this.disengage.bind(this);

    // this.triggerFn = this.engage.bind(this);
    // this.toggleFn = this.toggle.bind(this);
    // this.transmitFn = this.disengage.bind(this);

  }

  setAyCraft(ayCraft) {
    this.ayCraft = ayCraft;
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  toggle(signal = this.signal) {
    if (!this.isLatched) {
      this.engage(signal);
    } else {
      this.disengage(signal);
    }
  }

  engage(signal = this.signal) {
    this.isLatched = true;
    this.emit('engage', signal); // Emit an activation event
    this.transmit(signal);
  }

  disengage(signal) {
    this.isLatched = false;
    this.emit('disengage'); // Emit a deactivation event
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }
}

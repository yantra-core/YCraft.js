import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Button extends Part {
  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.connectedComponent = null;
    this.signal = new ElectricalSignal();
    this.connectedParts = [];
  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  press(signal = this.signal) {
    this.connectedParts.forEach(component => {
      if (component.receive && typeof component.receive === 'function') {
        this.emit('pressed', signal);
        component.receive(signal);
      }
    });
  }

  receive(signal) {
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

  release() {
    this.connectedParts.forEach(component => {
      if (component.receive && typeof component.receive === 'function') {
        this.emit('released');
      }
    });
  }
}

import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Button extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    this.signal = new ElectricalSignal();
    this.connectedParts = [];
  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  connect(component) {
    this.connectedParts.push(component);
  }

  press(signal = this.signal) {
    console.log('Button press', signal)
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

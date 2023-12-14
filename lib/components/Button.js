import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../ElectricalSignal.js';

export default class Button extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    this.signal = new ElectricalSignal();
  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  connect(component) {
    this.connectedComponent = component;
  }

  press(signal = this.signal) {
    console.log('Button press', signal)
    if (this.connectedComponent && typeof this.connectedComponent.receive === 'function') {
      this.emit('pressed', signal);
      // Emit signal to the connected component if it has a transmit method
      this.connectedComponent.receive(signal);
    }
  }

  release() {
    if (this.connectedComponent) {
      this.emit('released');
    }
  }
}

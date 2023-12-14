import EventEmitter from '../utils/EventEmitter.js';

export default class Button extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    this.amplitude = 1;
  }

  connect(component) {
    this.connectedComponent = component;
  }

  press() {
    console.log('Button press')
    if (this.connectedComponent && typeof this.connectedComponent.receive === 'function') {
      this.emit('pressed', this.amplitude);
      // Emit signal to the connected component if it has a transmit method
      this.connectedComponent.receive(this.amplitude);
    }
  }

  release() {
    if (this.connectedComponent) {
      this.emit('released');
    }
  }
}

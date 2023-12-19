import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Button extends Part {
  static type = 'Button';

  constructor(x = 0, y = 0, z = 0) {
    // curry the constructor to allow for multiple API styles
    if (typeof x === 'object') {
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    super(x, y, z);
    this.type = Button.type;
    this.signal = new ElectricalSignal();
    this.connectedParts = [];

    this.isOn = false;

    this.onFn = this.press.bind(this);
    this.offFn = this.release.bind(this);

  }

  setAyCraft(ayCraft) {
    this.ayCraft = ayCraft;
  }

  connect(component) {
    if (typeof component.inputs !== 'undefined') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }
  

  press(signal = this.signal) {
    // Emit press event and send signal
    this.isOn = true;
    this.emit('press', signal);
    this.connectedParts.forEach(component => {
      if (component.receive && typeof component.receive === 'function') {
        component.receive(signal);
      }
    });
  }

  release(signal = this.signal) {
    // Emit release event
    this.isOn = false;
    this.emit('release');
    signal.binarySignal = 0;
    this.connectedParts.forEach(component => {
      if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
        component.receive(signal);
      }
    });
  }

  receive(signal) {
    // Implement if needed; currently, the button may not need to receive signals
  }

  transmit(signal) {
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

}

import EventEmitter from '../utils/EventEmitter.js';

export default class Lever extends EventEmitter {
  constructor() {
    super();
    this.isOn = false; // Represents the state of the lever
    this.connectedParts = [];
  }

  connect(component) {
    this.connectedParts.push(component);
  }

  toggle() {
    this.isOn = !this.isOn;
    this.emit(this.isOn ? 'activated' : 'deactivated');
    this.connectedParts.forEach(comp => {
      if (typeof comp.receive === 'function') {
        comp.receive({ state: this.isOn ? 'on' : 'off' });
      }
    });
  }
}

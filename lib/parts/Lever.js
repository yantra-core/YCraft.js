import EventEmitter from '../utils/EventEmitter.js';

export default class Lever extends EventEmitter {
  constructor() {
    super();
    this.isOn = false; // Represents the state of the lever
    this.connectedComponents = [];
  }

  connect(component) {
    this.connectedComponents.push(component);
  }

  toggle() {
    this.isOn = !this.isOn;
    this.emit(this.isOn ? 'activated' : 'deactivated');
    this.connectedComponents.forEach(comp => {
      if (typeof comp.receive === 'function') {
        comp.receive({ state: this.isOn ? 'on' : 'off' });
      }
    });
  }
}

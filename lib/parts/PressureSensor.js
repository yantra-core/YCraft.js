import ElectricalSignal from '../signals/ElectricalSignal.js';
import { Part } from '../Part.js';

export default class PressureSensor extends Part {
  static type = 'PressureSensor';

  constructor(x = 0, y = 0, z = 0, { debounceDelay = 500 } = {}) {
    super(x, y, z);
    this.type = PressureSensor.type;
    this.connectedParts = [];
    this.signal = new ElectricalSignal();
    this.debounceDelay = debounceDelay; // Delay for debounce mechanism
    this.lastTriggerTime = 0; // Track the last time pressure was triggered

    this.onFn = this.trigger.bind(this);
    this.offFn = this.release.bind(this);
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  toggle() {
    const currentTime = Date.now();

    // Debounce check
    if (currentTime - this.lastTriggerTime < this.debounceDelay) {
      return; // Too soon since last trigger, ignore this trigger
    }

    if (this.isOn) {
      this.release();
    } else {
      this.trigger();
    }
  }

  trigger(signal = this.signal) {
    this.lastTriggerTime = Date.now();
    this.isOn = true;

    // Emit trigger event and send signal
    this.emit('trigger', signal);
    this.connectedParts.forEach(component => {
      if (component.onFn && typeof component.onFn === 'function') {
        component.onFn(signal);
      }
    });
  }

  release() {
    this.isOn = false;
    // Emit release event
    this.emit('release');
    this.connectedParts.forEach(component => {
      if (component.offFn && typeof component.offFn === 'function') {
        component.offFn(this.signal);
      }
    });
  }

  receive(signal) {
    // Logic for receiving signals if needed
  }
}

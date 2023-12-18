import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';


export default class Relay extends Part {

  static type = 'Relay';

  constructor(x = 0, y = 0, z = 0, { amplitude = 2 } = {}) {
    if (typeof x === 'object') {
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }

    super(x, y, z);
    this.type = Relay.type;
    this.connectedParts = [];
    this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
    this.signal = new ElectricalSignal();

    // TODO: we could implement resistance or signalLoss in relay

    this.outputs = [];
    this.inputs = [];

    this.onFn = this.activate.bind(this);
    this.offFn = this.deactivate.bind(this);

  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  connect(component) {
    if (typeof component.inputs !== 'undefined') {
      component.inputs.push(this);
    }
    this.outputs.push(component);
  }

  activate(signal = this.signal) {
    this.isOn = true;
    this.emit('activate', signal)
    // Transmit the amplified signal
    this.transmit(signal);
  }

  deactivate(signal = this.signal) {
    this.isOn = false;
    this.emit('deactivate', signal)
    signal.binarySignal = 0;
    this.outputs.forEach(component => {
      if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
        component.receive(signal);
      }
    });
  }

  toggle() {
    if (this.isOn) {
      this.deactivate()
    } else {
      this.activate()
    }
  }

  receive(signal = this.signal) {
    if (this.isOn) {
      this.deactivate(signal);
    } else {
      this.activate(signal)
    }
  }

  transmit(signal = this.signal) {
    this.outputs.forEach(part => {
      if (part.receive) {
        part.receive(signal);
      }
    });
  }

  update() {
    // Update logic for the Relay, if any
  }
}

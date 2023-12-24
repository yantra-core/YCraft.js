// can run arbitrary code between parts
// defaults to debian node.js sandbox
// allows developers to write arbitrary code inside contraptions
import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class VirtualMachine extends Part {

  static type = 'VirtualMachine';

  constructor() {
    super();
    this.type = VirtualMachine.type;
    this.props = {  };
    this.image = function noopImage (signal) { return signal; }
    this.connectedParts = [];
    this.inputs = [];
    this.outputs = [];
    // this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
  }

  setImage (fn) {
    this.image = fn;
  }

  connect(part) {
    this.connectedParts.push(part);
    this.outputs.push(part);
  }
  
  receive(signal) {
    let modified = this.image(signal);
    this.transmit(modified);
  }
 
  transmit(signal) {
    this.emit('transmit', this.outputs, signal);
    // Transmit signal to all connected parts
    this.outputs.forEach(part => {
      if (part.receive) {
        part.receive(signal);
      }
    });
  }

}
// TODO: WIP

class NorGate extends Part {
  constructor() {
    super();
    this.inputs = [];
  }

  receive(signal) {
    this.inputs.push(signal);
    if (this.inputs.length === 2) {
      this.emit('output', !(this.inputs[0] || this.inputs[1]));
      this.inputs = [];
    }
  }
}

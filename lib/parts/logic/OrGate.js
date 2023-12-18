// TODO: WIP

class OrGate extends Part {
  constructor() {
    super();
    this.inputs = [];
  }

  receive(signal) {
    // Add the signal to the inputs array
    this.inputs.push(signal);

    // Check if either of the two inputs is 'true' (i.e., a signal is present)
    if (this.inputs.length === 2) {
      const outputSignal = this.inputs[0] || this.inputs[1] ? new ElectricalSignal() : null;
      this.emit('output', outputSignal);
      this.inputs = []; // Reset inputs after operation
    }
  }
}

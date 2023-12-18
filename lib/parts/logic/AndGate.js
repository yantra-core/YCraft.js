class AndGate extends Part {
  constructor() {
    super();
    this.inputs = [];
  }

  receive(signal) {
    // Push the signal into the inputs array
    this.inputs.push(signal);

    // Check if there are two inputs
    if (this.inputs.length === 2) {
      // Perform logical AND using the existence of the signals
      const outputSignal = this.inputs[0] && this.inputs[1] ? new ElectricalSignal() : null;

      // Emit the output signal
      this.emit('output', outputSignal);

      // Reset inputs after operation
      this.inputs = [];
    }
  }
}

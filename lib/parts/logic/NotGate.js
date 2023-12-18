// TODO: WIP

class NotGate extends Part {
  constructor() {
    super();
  }

  receive(signal) {
    // Emit 'true' if no signal received, 'false' if signal is present
    this.emit('output', signal ? null : new ElectricalSignal());
  }
}

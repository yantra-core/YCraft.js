import ElectricalSignal from "../../lib/signals/ElectricalSignal.js";

export default class MockComponent {
  constructor() {
      this.receivedSignals = [];
      this.connectedParts = [];
      this.signal = new ElectricalSignal();
  }

  transmit(signal = this.signal) {
    console.log('signal', signal, 'this.connectedParts', this.connectedParts, 'this.connectedParts.length', this.connectedParts.length)
    this.receive(signal);
      this.connectedParts.forEach(component => {
          if (typeof component.receive === 'function') {
              component.receive(signal);
          }
      });
  }

  receive(signal) {
      this.receivedSignals.push(signal);
  }

  connect(component) {
    console.log("connectedPartsconnectedParts")
      this.connectedParts.push(component);
  }

  update () {
    console.log('update mock component');
  }

}

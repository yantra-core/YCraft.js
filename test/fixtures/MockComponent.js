import ElectricalSignal from "../../lib/signals/ElectricalSignal.js";

export default class MockComponent {
  constructor() {
      this.receivedSignals = [];
      this.connectedComponents = [];
      this.signal = new ElectricalSignal();
  }

  transmit(signal = this.signal) {
    console.log('signal', signal, 'this.connectedComponents', this.connectedComponents, 'this.connectedComponents.length', this.connectedComponents.length)
    this.receive(signal);
      this.connectedComponents.forEach(component => {
          if (typeof component.receive === 'function') {
              component.receive(signal);
          }
      });
  }

  receive(signal) {
      this.receivedSignals.push(signal);
  }

  connect(component) {
    console.log("connectedComponentsconnectedComponents")
      this.connectedComponents.push(component);
  }

  update () {
    console.log('update mock component');
  }

}

import ElectricalSignal from "../../lib/signals/ElectricalSignal.js";

export default class MockComponent {
  constructor(x = 0, y = 0, z = 0) {
    this.receivedSignals = [];
    this.connectedParts = [];
    this.signal = new ElectricalSignal();
    this.position = { x: x, y: y, z: z };
    this.onFn = this.receive.bind(this);
    // this.offFn = this.release.bind(this);
  }

  transmit(signal = this.signal) {
    //console.log('signal', signal, 'this.connectedParts', this.connectedParts, 'this.connectedParts.length', this.connectedParts.length)
    this.receive(signal);
    this.connectedParts.forEach(component => {
      if (typeof component.receive === 'function') {
        component.receive(signal);
      }
    });
  }

  receive(signal) {
    // console.log("receive signal", signal)
    this.receivedSignals.push(signal);
  }

  connect(component) {
    // console.log("connectedPartsconnectedParts")

    if (component.constructor.name === 'Wire') {
      // store reference in wire.inputs
      component.inputs.push(this);
    }

    this.connectedParts.push(component);
  }

  update() {
    console.log('update mock component');
  }

}

import EventEmitter from '../utils/EventEmitter.js';

export default class Wire extends EventEmitter {
  constructor({ length = 1, signalLoss = true } = {}) { // Length in meters, default to 1 meter
    super();
    this.length = length;
    this.signalLoss = signalLoss;
    this.resistivity = 1.68e-8; // Resistivity of copper in ohm meters
    this.crossSectionalArea = 2.08e-6; // Cross-sectional area in square meters (approximation for standard wire gauge)
    this.resistance = this.calculateResistance();
    this.connectedComponents = [];
  }

  calculateResistance() {
    // Resistance = resistivity * length / cross-sectional area
    return this.resistivity * this.length / this.crossSectionalArea;
  }
  connect(component) {
    this.connectedComponents.push(component);
  }

  receive(signal) {
    // Apply signal loss due to resistance
    if (this.signalLoss) {
      signal = this.applySignalLoss(signal);
    }
    console.log('Wire received signal: ', signal);
    this.transmit(signal);
  }

  applySignalLoss(signal) {
    // Calculate the voltage drop due to resistance
    let voltageDrop = signal.current * this.resistance;
    // Adjust the voltage of the signal directly
    signal.voltage = Math.max(signal.voltage - voltageDrop, 0); // Ensuring voltage doesn't go below 0
    return signal;
  }

  transmit(signal) {

    if (this.signalLoss) {
      signal = this.applySignalLoss(signal);
    }

    // Transmit signal to all connected components
    this.connectedComponents.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }
}
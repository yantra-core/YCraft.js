import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../ElectricalSignal.js'; // Assuming ElectricalSignal is in the same directory

export default class PowerSupply extends EventEmitter {
  constructor({ type = 'DC', voltage = 0, current = 0, frequency = 50, phaseAngle = 0, powerFactor = 1 } = {}) {
    super();
    this.type = type; // 'AC' or 'DC'
    this.voltage = voltage;
    this.current = current;
    this.frequency = type === 'AC' ? frequency : 0;
    this.phaseAngle = type === 'AC' ? phaseAngle : 0;
    this.powerFactor = type === 'AC' ? powerFactor : 1;
    this.otherParams = { frequency, phaseAngle, powerFactor };
    this.connectedComponents = [];
  }

  connect(component) {
    this.connectedComponents.push(component);
  }

  powerOn() {
    // Create an ElectricalSignal with the specified voltage, current, and other parameters
    const signal = new ElectricalSignal({
      voltage: this.voltage,
      current: this.current,
      ...this.otherParams
    });
    this.transmit(signal);
  }

  powerOff() {
    // Transmit a signal representing no power
    const signal = new ElectricalSignal({ voltage: 0, current: 0 });
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedComponents.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

  update() {
    // Optional: Update logic for the PowerSupply
  }
}

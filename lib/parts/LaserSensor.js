import EventEmitter from '../utils/EventEmitter.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class LaserSensor extends EventEmitter {
  constructor() {
    super();
    this.connectedComponent = null;
    // Laser signal can be represented by a specific ElectricalSignal
    this.laserSignal = new ElectricalSignal({ voltage: 5, current: 0.1 }); // Example values
  }

  connect(component) {
    this.connectedComponent = component;
  }

  emitLaser() {
    if (this.connectedComponent) {
      // console.log('LaserSensor: Emitting laser signal.');
      this.connectedComponent.receive(this.laserSignal);
    }
  }

  receive(signal) {
    // Handle received signal if needed
    // For instance, checking if the laser hits a target
  }
}

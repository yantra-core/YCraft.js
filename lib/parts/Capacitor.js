// TODO: WIP
import { Part } from '../Part.js';

export default class Capacitor extends Part {
  constructor(capacity = 1) {
    super();
    this.capacity = capacity;
    this.charge = 0;
    this.maxCharge = capacity * 5; // Max charge based on capacity and max voltage
    this.connectedParts = []; // Parts connected to the capacitor
  }

  connect(part) {
    if (part && typeof part.receive === 'function') {
      this.connectedParts.push(part);
    }
  }

  receive(signal) {
    // Handle incoming signal, possibly to charge the capacitor
    // This could be extended based on how you define a 'signal'
    if (signal.voltage) {
      this.charge(signal.voltage);
    }
  }

  transmit() {
    // Transmit the stored charge to connected parts
    this.connectedParts.forEach(part => {
      if (part.receive) {
        part.receive({ voltage: this.charge / this.capacity }); // Simplified example
      }
    });
  }

  discharge() {
    const dischargedEnergy = this.charge;
    this.charge = 0;

    // Transmit the discharged energy to connected parts
    this.transmit();

    this.emit('discharge', dischargedEnergy);

    // If no connected parts and the capacitor discharges, handle the 'blow up' scenario
    if (this.connectedParts.length === 0) {
      this.emit('blowup');
      // Additional logic for blowing up
    }
  }
  // Method to charge the capacitor
  charge(capacitorVoltage) {
    let additionalCharge = this.capacity * capacitorVoltage;
    
    if (this.charge + additionalCharge > this.maxCharge) {
      this.discharge(); // Auto-discharge if max charge is exceeded
    } else {
      this.charge += additionalCharge;
    }

    this.emit('charge', this.charge);
  }

  // Method to get current charge
  getCurrentCharge() {
    return this.charge;
  }
}

export default class ElectricalSignal {
  constructor({
      voltage = 5,    // Volts
      current = 1,    // Amps
      resistance = 0, // Ohms
      capacitance = 0, // Farads
      inductance = 0, // Henrys
      frequency = 0,  // Hertz (important for AC)
      phaseAngle = 0, // Degrees (important for AC)
      powerFactor = 1 // Unitless (important for AC)
  } = {}) {
      this.voltage = voltage;
      this.current = current;
      this.resistance = resistance;
      this.capacitance = capacitance;
      this.inductance = inductance;
      this.frequency = frequency;
      this.phaseAngle = phaseAngle;
      this.powerFactor = powerFactor;
  }

  // Method to calculate power, etc.
  calculatePower() {
      // Basic Power calculation for DC: P = VI
      // For AC, more complex calculations involving phaseAngle and powerFactor might be required
      return this.voltage * this.current;
  }

  // Method to encode a binary data signal using differential signaling
 encodeUSB(data) {
    // In USB 2.0, a logical '0' or '1' is represented by a voltage difference
    // between D+ and D- lines. Let's use simplified voltage levels for this.
    const differentialVoltage = data === 1 ? 0.2 : -0.2; // Example values

    // Setting D+ and D- voltages accordingly
    this.dPlusVoltage = this.voltage + differentialVoltage;
    this.dMinusVoltage = this.voltage - differentialVoltage;
  }


}

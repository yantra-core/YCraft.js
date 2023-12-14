import { Part } from "../Part.js";

export default class LEDLight extends Part {
  constructor(x = 0, y = 0, z = 0, { wattage = 40, maxWattage = 120 } = {}) {
    super(x, y, z);
    this.wattage = wattage;
    this.maxWattage = maxWattage;
    this.isOn = false; // Property to track the LED light's state
    this.isBroken = false; // Property to track if the light is broken
  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  receive(signal) {
    // Check if the light is broken
    if (this.isBroken) {
      console.log('LED light is broken and cannot be turned on.');
      return;
    }

    this.signal = signal;
    const power = signal.calculatePower();

    // Check for exceeding maxWattage
    if (power > this.maxWattage) {
      console.log('LED light has broken due to excessive power!');
      this.isOn = false;
      this.isBroken = true; // Permanently disable the light
      return;
    }

    if (this.isOn) {
      console.log('Turning off LED light...');
      this.isOn = false;
    } else {
      if (!this.realStone.powerRequired || power >= this.wattage) {
        console.log('Turning on LED light...', signal);
        this.isOn = true;
      } else {
        console.log('Insufficient power to turn on LED light...')
      }
    }
  }

  // Optionally, include an update method if you need dynamic behavior at each system tick
  update() {
    // Add dynamic effects like blinking or fading if the light is not broken
    if (!this.isBroken) {
      // Your update logic here
    }
  }
}

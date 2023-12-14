import EventEmitter from "../utils/EventEmitter.js";
export default class LEDLight extends EventEmitter {
  constructor({ wattage = 40 } = {}) {
    super();
    this.wattage = wattage;
    this.isOn = false; // Property to track the LED light's state
    this.voltage = 0;
  }

  setRealStone(realStone) {
    console.log('Setting real stone...', realStone);
    this.realStone = realStone;
  }

  receive(signal) {
    this.voltage = signal;

    if (this.isOn) {
      console.log('Turning off LED light...');
      this.isOn = false;
    } else {

      if (!this.realStone.powerRequired || signal >= this.wattage) {
        console.log('Turning on LED light...', this.voltage);
        this.isOn = true;
      } else {
        console.log('Insufficient power to turn on LED light...')
        // Turn off or remain off due to insufficient power
      }

    }

  }

  // Optionally, include an update method if you need dynamic behavior at each system tick
  update() {
    // This could be used for effects like blinking, fading, etc.
  }
}

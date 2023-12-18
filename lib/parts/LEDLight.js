import { Part } from "../Part.js";

export default class LEDLight extends Part {

  static type = 'LEDLight';

  constructor(x = 0, y = 0, z = 0, { wattage = 40, maxWattage = 120 } = {}) {
    // curry the constructor to allow for multiple API styles
    if (typeof x === 'object') {
      wattage = x.wattage || wattage;
      maxWattage = x.maxWattage || maxWattage;
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    super(x, y, z);
    this.toggleFn = this.toggle.bind(this);
    this.type = LEDLight.type;
    this.isOn = false; // Property to track the LED light's state
    this.color = 0x00ff00;

    // non-shared properties
    this.props = {};
    this.props.wattage = wattage;
    this.props.maxWattage = maxWattage;
    this.props.isBroken = false; // Property to track if the light is broken

  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  on(signal) {
    // console.log('Turning on LED light...', signal);
    this.isOn = true;
    this.emit('on', signal)
  }

  off(signal) {
    // console.log('Turning off LED light...');
    this.isOn = false;
    this.emit('off', signal)
  }

  toggle (signal) {
    if (this.isOn) {
      this.off(signal)
    } else {
      this.on(signal)
    }
  }

  receive(signal) {
    // Check if the light is broken
    if (this.props.isBroken) {
      // console.log('LED light is broken and cannot be turned on.');
      return;
    }

    this.signal = signal;
    const power = signal.calculatePower();
    // Check for exceeding maxWattage
    if (power > this.props.maxWattage) {
      // console.log('LED light has broken due to excessive power!');
      this.isOn = false;
      this.props.isBroken = true; // Permanently disable the light
      this.emit('broken')
      return;
    }

    if (this.isOn) {
      // console.log('Turning off LED light...');
      this.isOn = false;
      this.emit('off', signal)
    } else {
      if (!this.realStone.powerRequired || power >= this.props.wattage) {
        // console.log('Turning on LED light...', signal);
        this.isOn = true;
        this.emit('on', signal)
      } else {
        // console.log('Insufficient power to turn on LED light...')
      }
    }
  }

  handleCollision(entity) {

    // Check if the light is broken
    if (this.props.isBroken) {
      // console.log('LED light is broken and cannot be turned on.');
      return;
    }

    // Check if the entity is a Rover
    if (entity.type === 'Rover') {
      // console.log('LED light has broken due to collision with Rover!');
      this.isOn = false;
      this.props.isBroken = true; // Permanently disable the light
      this.props.color = 'grey';
      this.emit('broken')
    }

  }

  // Optionally, include an update method if you need dynamic behavior at each system tick
  update() {
    // Add dynamic effects like blinking or fading if the light is not broken
    if (!this.props.isBroken) {
      // Your update logic here
    }
  }
}

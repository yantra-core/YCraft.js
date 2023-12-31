import { Part } from '../Part.js';

export default class Actuator extends Part {

  static type = 'Actuator';

  constructor(x = 0, y = 0, z = 0, { frequency = 1000 } = {} ) { // frequency in milliseconds
    super(x, y, z);
    this.type = Actuator.type;
    this.isActive = false;

    this.isOn = false;

    this.onFn = this.start.bind(this);
    this.offFn = this.stop.bind(this);

    // this.signalMode = 'continuous';
    this.timers = {
      pulse: null
    };
    this.frequency = frequency;
    this.connectedParts = [];
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  receive(signal) {
    console.log("Actuator received signal", signal)
    this.signal = signal;
    this.toggle();
  }

  toggle() {

    if (!this.isOn) {
      this.start();
      this.emit('start');
      this.isOn = true;
      // immediately send a signal to connected components
      this.update();
    } else {
      this.stop();
      this.emit('stop');
      this.isOn = false;
    }
  }

  start() {
    if (this.timers.pulse === null) {
      this.timers.pulse = setInterval(() => {
        this.update();
      }, this.frequency);
    }
  }

  stop() {
    if (this.timers.pulse !== null) {
      clearInterval(this.timers.pulse);
      this.timers.pulse = null;
    }
  }

  update() {
    if (this.isOn) {
      this.emit('pulse', this.signal)
      // Perform actions while the actuator is active
      this.connectedParts.forEach(comp => comp.receive(this.signal));
    }
  }

  unload () {
    // remove all timers
    this.stop();
  }

}

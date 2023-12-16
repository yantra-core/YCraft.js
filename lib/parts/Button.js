import { Part } from '../Part.js';
import ElectricalSignal from '../signals/ElectricalSignal.js';

export default class Button extends Part {

  static type = 'Button';

  constructor(x = 0, y = 0, z = 0) {
    super(x, y, z);
    this.type = Button.type;
    this.connectedComponent = null;
    this.signal = new ElectricalSignal();
    this.connectedParts = [];
    this.toggleDelay = 100; // Delay for debounce
    this.autoReleaseDelay = 500; // Delay for auto-release
    this.lastToggle = 0;
    this.props = {};
    // Whether the button is latching or not
    // If latching is true, the button will stay pressed until pressed again
    // If latching is false, the button will auto-release after a delay
    this.props.latching = true;
    this.pressTimer = null; // Timer for auto-release
  }

  setRealStone(realStone) {
    this.realStone = realStone;
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  press(signal = this.signal) {
    const currentTime = Date.now();
    
    // Debounce: check if enough time has passed since the last press
    if (currentTime - this.lastToggle < this.toggleDelay) {
      //throw new Error('Button debounce');
      console.log('Button debounce')
      return; // Not enough time has passed, so exit the function
    }

    // Update the last toggle time
    this.lastToggle = currentTime;

    // Emit press event and send signal
    // console.log('Button.press', signal);
    this.emit('press', signal);
    this.connectedParts.forEach(component => {
      console.log('Button connected component', component)
      if (component.receive && typeof component.receive === 'function') {
        component.receive(signal);
      }
    });

    // Clear existing timer if any
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }

    // Set a timer for auto-release
    this.pressTimer = setTimeout(() => {
      this.release();
      this.pressTimer = null;
    }, this.autoReleaseDelay);
  }

  receive(signal) {
    this.transmit(signal);
  }

  transmit(signal) {
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive(signal);
      }
    });
  }

  release() {
    this.emit('release');
    // console.log('Button released');
    if (!this.props.latching) {
      this.connectedParts.forEach(component => {
        if (component.off && typeof component.off === 'function') {
          component.off(this.signal);
        }
      });
    }
  }
}

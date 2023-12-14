import EventEmitter from './utils/EventEmitter.js';
import Wire from './components/Wire.js';
import PressureSensor from './components/PressureSensor.js';
import LEDLight from './components/LEDLight.js';
// Import other components as needed

class RealStone extends EventEmitter {
  constructor({ powerRequired = false } = {}) {
    super();
    this.components = [];

    this.powerRequired = powerRequired;

  }

  addComponent(component) {
    this.components.push(component);
    if (component instanceof EventEmitter) {
      component.onAny((eventName, ...args) => {
        // Forward the component's events to the RealStone instance
        this.emit(eventName, ...args);
      });
      console.log('asdasd', component)
      if (typeof component.setRealStone === 'function') {
        console.log('asdasddddddd')
        component.setRealStone(this);
    }

    }
  }

  findComponent(componentType) {
    return this.components.find(component => component instanceof componentType);
  }


  // Method to toggle power requirements globally
  setPowerRequired(enforce) {
    this.config.powerRequired = enforce;
  }

  run() {
    // Logic to simulate the circuit behavior
    // This can be as simple or complex as needed, depending on the simulation requirements
  }

  tick() {
    // Logic to update the state of the system at each tick
    this.components.forEach(component => {
      if (typeof component.update === 'function') {
        component.update();
      }
    });

    // Additional logic for each tick, if needed
  }

  // Additional methods, if needed...
}

export default RealStone;

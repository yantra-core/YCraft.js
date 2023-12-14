import EventEmitter from './utils/EventEmitter.js';
import Wire from './parts/Wire.js';
import PressureSensor from './parts/PressureSensor.js';
import LEDLight from './parts/LEDLight.js';
// Import other parts as needed

class RealStone extends EventEmitter {
  constructor({ powerRequired = false } = {}) {
    super();
    this.parts = [];

    this.powerRequired = powerRequired;

  }

  addPart(part) {
    this.parts.push(part);
    if (part instanceof EventEmitter) {
      part.onAny((eventName, ...args) => {
        // Forward the part's events to the RealStone instance
        this.emit(eventName, ...args);
      });
      if (typeof part.setRealStone === 'function') {
        part.setRealStone(this);
      }

    }
  }

  findpart(partType) {
    return this.parts.find(part => part instanceof partType);
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
    this.parts.forEach(part => {
      if (typeof part.update === 'function') {
        part.update();
      }
    });

  }

  toJSON() {
    return {
      powerRequired: this.powerRequired,
      parts: this.parts.map(part => {
        return {
          type: part.constructor.name,
          properties: this.getpartProperties(part)
        };
      })
    };
  }

  getpartProperties(part) {
    // Extract and return the relevant properties of each part
    // This can be customized based on what properties you want to include in the JSON
    const properties = {};
    for (const key in part) {
      if (part.hasOwnProperty(key)) {
        properties[key] = part[key];
      }
    }
    return properties;
  }

}

export default RealStone;

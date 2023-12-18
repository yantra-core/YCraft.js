// TODO: WIP

import { Part } from '../Part.js';

export default class Counter extends Part {
  constructor(initialValue = 0) {
    super();
    this.count = initialValue;
  }

  // Method to increment the counter
  increment() {
    this.count += 1;
    this.emit('count', this.count); // Emit the current count
  }

  // Method to reset the counter to its initial value or to a specific value
  reset(value = 0) {
    this.count = value;
    this.emit('reset', this.count); // Emit the reset event with the current count
  }

  // Optional: Connect this counter to a clock or a button
  connect(component) {
    // Implement the logic for connecting to a clock or a button
    // For example, incrementing the counter every time a connected button is pressed
    if (component instanceof Button) {
      component.on('press', () => this.increment());
    }
  }
}

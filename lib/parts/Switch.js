// TODO: WIP

import { Part } from '../Part.js';

export default class Switch extends Part {
  static type = 'Switch';

  constructor(x = 0, y = 0, z = 0, initialState = 0, totalStates = 2) {
    super(x, y, z);
    this.type = Switch.type;
    this.state = initialState;
    this.totalStates = totalStates;
    this.connectedParts = [];
  }

  connect(component) {
    if (component.constructor.name === 'Wire') {
      component.inputs.push(this);
    }
    this.connectedParts.push(component);
  }

  toggle() {
    this.state = (this.state + 1) % this.totalStates; // Increment state and wrap around if it exceeds totalStates
    this.emit('toggle', this.state);
    this.transmit(this.state);
  }

  transmit(state) {
    this.connectedParts.forEach(component => {
      if (component.receive) {
        component.receive({ switchState: state });
      }
    });
  }

  // Method to set the switch to a specific state
  setState(newState) {
    if (newState >= 0 && newState < this.totalStates) {
      this.state = newState;
      this.emit('stateChange', this.state);
      this.transmit(this.state);
    } else {
      console.error('Invalid state for switch');
    }
  }
}

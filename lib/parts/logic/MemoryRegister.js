// TODO: WIP

import { Part } from '../Part.js';

export default class MemoryRegister extends Part {
  constructor(size = 8) {
    super();
    this.size = size; // Size of the register in bits
    this.data = new Array(size).fill(null); // Initialize memory with null or a default value
  }

  // Write data to the register
  write(address, value) {
    if (address >= 0 && address < this.size) {
      this.data[address] = value;
      this.emit('write', { address, value });
    } else {
      throw new Error('Invalid memory address');
    }
  }

  // Read data from the register
  read(address) {
    if (address >= 0 && address < this.size) {
      this.emit('read', { address, value: this.data[address] });
      return this.data[address];
    } else {
      throw new Error('Invalid memory address');
    }
  }

  // Optional: Method to reset the memory
  reset() {
    this.data.fill(null);
    this.emit('reset');
  }
}

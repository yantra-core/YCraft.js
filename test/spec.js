
  /* // TODO: something like this to support duration of signal
  tick() {
    this.parts.forEach(part => {
      // Update the part if it has an update method
      if (typeof part.update === 'function') {
        part.update();
      }

      // Check and update signal durations
      if (part instanceof ElectricalSignal) {
        if (part.durationTicks > 0) {
          part.durationTicks--;
        } else {
          // Handle the expiration of the signal
          part.handleSignalExpiration(); // This method should be implemented in parts
        }
      }
    });
  }*/

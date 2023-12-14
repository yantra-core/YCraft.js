export default class LightSignal {
  constructor({
      intensity = 1,      // Light intensity (arbitrary units)
      wavelength = 550,   // Wavelength in nanometers (visible light spectrum)
      direction = 0       // Direction of light in degrees
  } = {}) {
      this.intensity = intensity;
      this.wavelength = wavelength;
      this.direction = direction;
  }

  // Methods to manipulate light signal properties
  changeIntensity(newIntensity) {
      this.intensity = newIntensity;
  }

  changeWavelength(newWavelength) {
      this.wavelength = newWavelength;
  }

  changeDirection(newDirection) {
      this.direction = newDirection;
  }

  // Additional light-specific methods...
}

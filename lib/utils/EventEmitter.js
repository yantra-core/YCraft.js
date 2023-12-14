export default class EventEmitter {
  constructor() {
    this.listeners = {};
    this.anyListeners = [];
  }

  onAny(callback) {
    this.anyListeners.push(callback);
  }

  offAny(callback) {
    this.anyListeners = this.anyListeners.filter(listener => listener !== callback);
  }

  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== callback);
    }
  }

  once(eventName, callback) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      callback.apply(this, args);
    };
    this.on(eventName, onceWrapper);
  }

  emit(eventName, ...args) {
    // Call anyListeners if they exist
    this.anyListeners.forEach(listener => {
      try {
        listener.call(this, eventName, ...args);
      } catch (error) {
        console.error(`Error when executing any listener for event "${eventName}":`, error);
      }
    });

    // Emit to specific event listeners
    const listeners = this.listeners[eventName];
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener.apply(this, args);
        } catch (error) {
          console.error(`Error when executing listener for event "${eventName}":`, error);
        }
      });
    }
  }

  listenerCount(eventPattern) {
    return this.listeners[eventPattern] ? this.listeners[eventPattern].length : 0;
  }
}
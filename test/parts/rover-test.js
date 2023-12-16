import tap from 'tape';
import Rover from '../../lib/parts/Rover.js';
import MockComponent from '../fixtures/MockComponent.js';

// Test Rover constructor
tap.test('Rover Constructor', (t) => {
  const rover = new Rover(0, 0, 0, { velocity: { x: 5, y: 5 }, color: 0xcccccc });

  t.equal(rover.position.x, 0, 'Initial X position should be 0');
  t.equal(rover.position.y, 0, 'Initial Y position should be 0');
  t.equal(rover.props.velocity.x, 5, 'Initial velocity x should be 5');
  t.equal(rover.props.velocity.y, 5, 'Initial velocity y should be 5');
  t.end();
});

// Test toggleOnOff method
tap.test('Rover toggleOnOff', (t) => {
  const rover = new Rover();
  rover.toggle();

  t.equal(rover.isOn, true, 'Rover should be turned on');
  t.equal(rover.state, 'active', 'Rover state should be active');

  rover.toggle();
  t.equal(rover.isOn, false, 'Rover should be turned off');
  t.equal(rover.state, 'inactive', 'Rover state should be inactive');
  t.end();
});

// Add more tests for startMoving, stopMoving, update, handleCollision, and startCollisionCooldown

// Example test for handleCollision
tap.test('Rover handleCollision', (t) => {
  const rover = new Rover();
  rover.toggle(); // Start the rover

  // Simulate a collision
  rover.handleCollision({ name: 'OtherPart' });

  // Check if the rover's velocity is reversed
  t.equal(rover.props.velocity.x, -5, 'Velocity x should be reversed');
  t.equal(rover.props.velocity.y, -5, 'Velocity y should be reversed');

  rover.stopMoving(); // Stop the rover
  t.end();
});

// Run additional tests for other scenarios and methods

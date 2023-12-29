function contraptionsExample() {

  let exampleA = new YC.YCraft(0, 150, 0, {
    description: "Simple Light",
    height: 350,
    width: 800
  });

  // TODO: new YC.Box() ?
  let button0 = new YC.Button(-100, -150, 0);
  let latch0 = new YC.Latch(-100, 0, 0);
  let light0 = new YC.LEDLight(100, -75, 200, { wattage: 60, height: 250, width: 250 });

  button0.connect(light0);
  latch0.connect(light0);

  exampleA.addPart(light0);
  exampleA.addPart(button0);
  exampleA.addPart(latch0);

  
  // TODO: render contraptions backgrounds in CSSGraphics, ect
  let exampleB = new YC.YCraft(0, 600, 0, {
    description: "Wired Light",
    height: 400,
    width: 800
  });


  let wire1 = new YC.Wire();
  let wire2 = new YC.Wire();
  let button1 = new YC.Button(-150, -150, 0);
  let latch1 = new YC.Latch(-150, 0, 0);
  let relay1 = new YC.Relay(0, -75, 0);
  let light1 = new YC.LEDLight(150, -75, 800, { wattage: 60, height: 250, width: 250 });

  button1.connect(wire1);
  latch1.connect(wire1);
  wire1.connect(relay1);
  relay1.connect(wire2);
  wire2.connect(light1);

  exampleB.addPart(light1);
  exampleB.addPart(button1);
  exampleB.addPart(latch1);
  exampleB.addPart(relay1);
  exampleB.addPart(wire1);
  exampleB.addPart(wire2);

  let examples = new YC.YCraft();
  examples.addContraption(exampleA);
  examples.addContraption(exampleB);

  return examples;

}

document.addEventListener('DOMContentLoaded', async (event) => {

  let game = new MANTRA.Game({
    physics: 'matter', // enum, 'physx', 'matter
    collisions: true,
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    camera: {
      follow: true
    }
  });
  
  game.start(function(){
    game.use('Editor');

    game.use('YCraft', {
      contraption: contraptionsExample
    });
    game.use('YCraftGUI');

    document.addEventListener('click', function (e) {
      // check to see if we are inside an input, textarea, button or submit
      // if so, disable inputs controls
      let target = e.target;
      let tagName = target.tagName.toLowerCase();
      let type = target.type;
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'button' || tagName === 'submit') {
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      } else {
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      }
    });

  });

  window.game = game;

});
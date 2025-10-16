import Environment from "../Engine/Environment.js";
import EPEStore from "../Engine/EPEStore.js";
import GenericObject from "../Engine/GenericObject.js";
import CircleObject from "../Engine/Generics/CircleObject.js";
import GraphBar from "../Engine/Generics/GraphBar.js";
import GraphObject from "../Engine/Generics/GraphObject.js";
import ImageObject from "../Engine/Generics/ImageObject.js";
import SquareObject from "../Engine/Generics/SquareObject.js";
import { GPEStore } from "../Engine/GPEStore.js";
import KEStore from "../Engine/KEStore.js";
import { getID } from "../Engine/Tools/Tools.js";
const myEnvironment = new Environment({
  base: 700,
});
const screenHeight = window.innerHeight; // px
const metersOnScreen = 1; // e.g., 2 meters represented by 600px
const pixelsPerMeter = screenHeight / metersOnScreen; // 300 px/m
/* const myObject1 = new SquareObject({
	mass: 2,
	position: { x: 100, y: -100 },
	velocity: { x: 0, y: 0 },
	base: 700,
	sizeX: 100,
	sizeY: 100,
	resistance: -1,
	environment: myEnvironment,
});
const myObject2 = new CircleObject({
	mass: 5,
	position: { x: 100, y: 100 },
	velocity: { x: 0, y: 0 },
	base: 700,
	radius: 50,
	resistance: -1,
	environment: myEnvironment,
});
const GPEAttachment1 = new GPEStore({
	gravity: 1, // m/s² (moon gravity)
	pixelsPerMeter: pixelsPerMeter,
});
const KEAttachment1 = new KEStore({});

const KEAttachment2 = new KEStore({});
const GPEAttachment2 = new GPEStore({
	gravity: 1, // m/s² (moon gravity)
	pixelsPerMeter: pixelsPerMeter,
});

const EPEAttachment1 = new EPEStore({
	springConstant: 3000, // N/m
});
const EPEAttachment2 = new EPEStore({
	springConstant: 3000, // N/m
});
myObject1.attachEnergyStore(GPEAttachment1);
myObject1.attachEnergyStore(KEAttachment1);
myObject1.attachEnergyStore(EPEAttachment1); // Extra KE store to show multiple stores on one object

myObject2.attachEnergyStore(GPEAttachment2);
myObject2.attachEnergyStore(KEAttachment2);
myObject2.attachEnergyStore(EPEAttachment2); // Extra KE store to show multiple stores on one object

//Graph instantiation
let graph1 = new GraphObject({
	x: 400,
	y: 200,
	width: 500,
	height: 500,
	target: myEnvironment,
	sizeX: 8,
	sizeY: 8,
	max: 500,
});
let bar1 = new GraphBar({
	cWidth: 1,
	cHeight: 2,
	parent: graph1,
	start: 1,
	color: "#00fa00",
});
let bar2 = new GraphBar({
	cWidth: 1,
	cHeight: 2,
	parent: graph1,
	start: 2,
 	color: "green",
});

let bar3 = new GraphBar({
	cWidth: 1,
	cHeight: 2,
	parent: graph1,
	start: 4,
	color: "royalblue",
});
let bar4 = new GraphBar({
	cWidth: 1,
	cHeight: 2,
	parent: graph1,
	start: 5,
	color: "blue",
});

let bar5 = new GraphBar({
	cWidth: 1,
	cHeight: 2,
	parent: graph1,
	start: 6,
	color: "red",
})
bar1.setText("KE");
bar2.setText("GPE");

bar3.setText("KE");
bar4.setText("GPE");
bar5.setText("EPE");
//Update Graph
myObject2.softBody = true;
myObject1.softBody = true;
myEnvironment.update({
	interval: 0,
	start: () => {
		bar1.setValue(Math.abs(KEAttachment1.energy / 500));
		bar2.setValue(Math.abs(GPEAttachment1.energy / 500));

		bar3.setValue(Math.abs(KEAttachment2.energy / 500));
		bar4.setValue(Math.abs(GPEAttachment2.energy / 500));

		bar5.setValue((1-myObject2.bodyProps.scaleY)*45);
	},
});
 */
//Initialisation
let myFlappyBird = new ImageObject({
  mass: 2,
  position: { x: 100, y: 200 },
  velocity: { x: 0, y: 0 },
  base: myEnvironment.base,
  sizeX: 80,
  sizeY: 40,
  resistance: -1,
  environment: myEnvironment,
  src: "../Assets/redbird-upflap.png",
  rotation:0,
});
myFlappyBird.addKeyBind({
  key: " ",
  desc: "Flap",
  start: () => {
    myFlappyBird.velocity.y = -120;

    myFlappyBird.position.y = Math.min(
      myFlappyBird.position.y,
      myEnvironment.base - myFlappyBird.sizeY - 1
    );
    console.log("GG");
  },
});
//Attach GPE Store
const GPEAttachment1 = new GPEStore({
  gravity: 0.2, // m/s² (moon gravity)
  pixelsPerMeter: pixelsPerMeter,
});
myFlappyBird.attachEnergyStore(GPEAttachment1);
//Events
myFlappyBird.addEventListener("collide", (source, otherObject) => {
  //If bird is falling
  if (source.velocity.y > 0) {

    if (source.position.y <= otherObject.position.y) {
      source.velocity.y = 0;
	  
    }
  }
});

//Pipes
myEnvironment.pipes = [];
myEnvironment.update({
  interval: 2500 / 1000,
  start: () => {
    //Create new Pipes
	let minGap = myFlappyBird.sizeY*2
	let gap = Math.floor(Math.random()*(350-200+1)) + 200
    let topHeight = Math.random()*(myEnvironment.canvas.height-gap)
    let bottomHeight =  myEnvironment.canvas.height-topHeight-gap
	const currentTopPipe = new ImageObject({
		mass: 2,
		position: { x: myEnvironment.canvas.width, y: 0 },
		velocity: { x: 0, y: 0 },
		base: 700,
		sizeX: 50,
		sizeY: topHeight,
		resistance: -1,
		environment: myEnvironment,
		src: "../Assets/pipe-green-flip.png",
		
	  });
	  currentTopPipe.forceAspectRatio = false
	  const currentBottomPipe = new ImageObject({
		mass: 2,
		position: { x: myEnvironment.canvas.width, y: myEnvironment.base-bottomHeight },
		velocity: { x: 0, y: 0 },
		base: 700,
		sizeX: 50,
		sizeY: bottomHeight,
		resistance: -1,
		environment: myEnvironment,
		src: "../Assets/pipe-green.png",
	  });
	  currentBottomPipe.forceAspectRatio = false
    myEnvironment.pipes.push(currentTopPipe);
    myEnvironment.pipes.push(currentBottomPipe);
  },
});
//Constantly update Environment
myEnvironment.update({
  interval: 0,
  start: () => {
	myFlappyBird.rotation = Math.min(myFlappyBird.velocity.y/3  ,90  )  
    for (let pipe of myEnvironment.pipes) {
      pipe.position.x -= 7.5;
      pipe.drawSoftBody(myEnvironment.context);
      myFlappyBird.drawSoftBody(myEnvironment.context);
	  if(pipe.position.x<myFlappyBird.position.x){
		pipe.position.y--
	  }
    }
  },
});

import Environment from "../Engine/Environment.js";
import GenericObject from "../Engine/GenericObject.js";
import CircleObject from "../Engine/Generics/CircleObject.js";
import SquareObject from "../Engine/Generics/SquareObject.js";
import { GPEStore } from "../Engine/GPEStore.js";
import { getID } from "../Engine/Tools/Tools.js";
const myEnvironment = new Environment();
const screenHeight = window.innerHeight; // px
const metersOnScreen = 1; // e.g., 2 meters represented by 600px
const pixelsPerMeter = screenHeight / metersOnScreen; // 300 px/m
const myObject1 = new SquareObject({
	mass: 2,
	position: { x: 100, y: 100 },
	velocity: { x: 0, y: 0 },
	base: 600,
	sizeX: 100,
	sizeY: 100,
	resistance: -1,
	environment: myEnvironment,
});
const myObject2 = new CircleObject({
	mass: 2,
	position: { x: 100, y: 100 },
	velocity: { x: 0, y: 0 },
	base: 600,
	radius: 50,
	resistance: -1,
	environment: myEnvironment,
});
const GPEAttachment1 = new GPEStore({
	gravity: 1, // m/s² (moon gravity)
	pixelsPerMeter: pixelsPerMeter,
});
const GPEAttachment2 = new GPEStore({
	gravity: 1, // m/s² (moon gravity)
	pixelsPerMeter: pixelsPerMeter,
});
myObject1.attachEnergyStore(GPEAttachment1);

myEnvironment.update({
	interval: 0,
	start: () => {},
});
setTimeout(() => {
	myObject2.attachEnergyStore(GPEAttachment2);
}, 2000);

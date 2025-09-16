import Environment from "../Engine/Environment.js";
import GenericObject from "../Engine/GenericObject.js";
import CircleObject from "../Engine/Generics/CircleObject.js";
import GraphBar from "../Engine/Generics/GraphBar.js";
import GraphObject from "../Engine/Generics/GraphObject.js";
import SquareObject from "../Engine/Generics/SquareObject.js";
import { GPEStore } from "../Engine/GPEStore.js";
import KEStore from "../Engine/KEStore.js";
import { getID } from "../Engine/Tools/Tools.js";
const myEnvironment = new Environment();
const screenHeight = window.innerHeight; // px
const metersOnScreen = 1; // e.g., 2 meters represented by 600px
const pixelsPerMeter = screenHeight / metersOnScreen; // 300 px/m
const myObject1 = new SquareObject({
	mass: 2,
	position: { x: 100, y: 100 },
	velocity: { x: 0, y: 0 },
	base: 700,
	sizeX: 100,
	sizeY: 100,
	resistance: -1,
	environment: myEnvironment,
});
const myObject2 = new CircleObject({
	mass: 2,
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
const KEAttachment1 = new KEStore({
	
})
const GPEAttachment2 = new GPEStore({
	gravity: 1, // m/s² (moon gravity)
	pixelsPerMeter: pixelsPerMeter,
});
myObject1.attachEnergyStore(GPEAttachment1);
myObject1.attachEnergyStore(KEAttachment1);

//Graph instantiation
let graph1 = new GraphObject({x:400,y:200,width:500,height:500,target:myEnvironment,sizeX:8,sizeY:8})
let bar1 = new GraphBar({cWidth:1,cHeight:2,parent:graph1,start:1,color:"#00fa00"})
let bar2 = new GraphBar({cWidth:1,cHeight:2,parent:graph1,start:2,color:"green"})
bar1.setText("KE")
//Update Graph
myEnvironment.update({
	interval: 0,
	start: () => {
		bar1.setValue(KEAttachment1.energy/500)
		bar2.setValue(GPEAttachment1.energy/500)
		

	},
});
setTimeout(() => {
	myObject2.attachEnergyStore(GPEAttachment2);
}, 2000); 


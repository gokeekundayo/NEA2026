import Environment from "../Engine/Environment.js";
import EPEStore from "../Engine/EPEStore.js";
import GenericObject from "../Engine/GenericObject.js";
import CircleObject from "../Engine/Generics/CircleObject.js";
import GraphBar from "../Engine/Generics/GraphBar.js";
import GraphObject from "../Engine/Generics/GraphObject.js";
import ImageObject from "../Engine/Generics/ImageObject.js";
import SquareObject from "../Engine/Generics/SquareObject.js";
import { TextObject } from "../Engine/Generics/TextObject.js";
import { GPEStore } from "../Engine/GPEStore.js";
import KEStore from "../Engine/KEStore.js";
import { getID } from "../Engine/Tools/Tools.js";
const myEnvironment = new Environment({
	base: window.innerHeight,
	meta: { name: "Flappy Bird Simulation", score: 0 },
});

const screenHeight = window.innerHeight; // px
const metersOnScreen = 1; // e.g., 2 meters represented by 600px
const pixelsPerMeter = screenHeight / metersOnScreen; // 300 px/m
//Asseting
let AssetsList = [
	"../Assets/flappybirdskin.png",
	"../Assets/Sprites/0.png",
	"../Assets/Sprites/1.png",
	"../Assets/Sprites/2.png",
	"../Assets/Sprites/3.png",
	"../Assets/Sprites/4.png",
	"../Assets/Sprites/5.png",
	"../Assets/Sprites/6.png",
	"../Assets/Sprites/7.png",
	"../Assets/Sprites/8.png",
	"../Assets/Sprites/9.png",
	"../Assets/Sprites/background-day.png",
	"../Assets/Sprites/background-night.png",
	"../Assets/Sprites/base.png",
	"../Assets/Sprites/bluebird-downflap.png",
	"../Assets/Sprites/gameover.png",
	"../Assets/Sprites/message.png",
	"../Assets/Sprites/pipe-green-flip.png",
	"../Assets/Sprites/pipe-green.png",
	"../Assets/Sprites/pipe-red.png",
	"../Assets/Sprites/redbird-downflap.png",
	"../Assets/Sprites/redbird-midflap.png",
	"../Assets/Sprites/redbird-upflap.png",
	"../Assets/Sprites/yellowbird-downflap.png",
	"../Assets/Sprites/yellowbird-midflap.png",
	"../Assets/Sprites/yellowbird-upflap.png",
	"../Assets/Backgrounds/citybackground2.png",
];
const Assets = {};
let loadedAssets = false;
async function LoadAssets(AssetList) {
	const loadedImages = [];
	for (let source in AssetList) {
		await new Promise((resolve, reject) => {
			const Asset = new Image();
			Asset.src = AssetList[source];
			const percentage = (source / (AssetList.length - 1)) * 100;
			getID("currentAssetText").innerHTML = AssetList[source].replace(
				"../Assets/",
				""
			);

			Asset.addEventListener("load", () => {
				Assets[AssetList[source].replace("../Assets/", "")] = Asset;
				getID("progressFill").style.width = `${percentage}%`;

				resolve();
			});
			Asset.onerror = reject;
		});
	}
	return Assets;
}
LoadAssets(AssetsList).then((Assets) => {
	loadedAssets = true;
	myEnvironment.meta.Assets = Assets;
	getID("startGameButton").setAttribute("active", "true");
});

//Game

function startGame() {
	myEnvironment.canvas.height =
		myEnvironment.meta.Assets["Backgrounds/citybackground2.png"].height;
	myEnvironment.canvas.width =
		myEnvironment.meta.Assets["Backgrounds/citybackground2.png"].width;
	let cityBackground = new ImageObject({
		mass: 2,
		position: { x: 0, y: 0 },
		velocity: { x: 0, y: 0 },
		base: myEnvironment.base,
		sizeX: myEnvironment.meta.Assets["Backgrounds/citybackground2.png"].width,
		sizeY: myEnvironment.meta.Assets["Backgrounds/citybackground2.png"].height,
		resistance: -1,
		environment: myEnvironment,
		src: "Backgrounds/citybackground2.png",
		rotation: 0,
	});
	//Initialisation
	let myFlappyBird = new ImageObject({
		mass: 2,
		position: { x: 100, y: 200 },
		velocity: { x: 0, y: 0 },
		base: myEnvironment.base,
		sizeX: 70,
		sizeY: 70,
		resistance: -1,
		environment: myEnvironment,
		src: "flappybirdskin.png",
		rotation: 0,
	});

	let myScore = new TextObject({
		text: "0",
		color: "#850707FF",
		fontSize: 30,
		position: { x: myEnvironment.canvas.width / 2, y: myEnvironment.base / 2 },
		velocity: { x: 0, y: 0 },
		environment: myEnvironment,
		textAlign: "center",
		fontFamily: "SupplyCenter",
	});
	myFlappyBird.addKeyBind({
		key: " ",
		desc: "Flap",
		start: () => {
			myFlappyBird.velocity.y = -200;

			myFlappyBird.position.y = Math.min(
				myFlappyBird.position.y,
				myEnvironment.base - myFlappyBird.sizeY - 1
			);
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
		interval: 1750 / 1000,
		start: () => {
			//Create new Pipes
			let minGap = myFlappyBird.sizeY * 2;
			let gap = Math.floor(Math.random() * (350 - 200 + 1)) + 200;
			let topHeight = Math.random() * (myEnvironment.base - gap);
			let bottomHeight = myEnvironment.base - topHeight - gap;
			const currentTopPipe = new ImageObject({
				mass: 2,
				position: { x: myEnvironment.canvas.width, y: 0 },
				velocity: { x: 0, y: 0 },
				base: myEnvironment.base,
				sizeX: 50,
				sizeY: topHeight,
				resistance: -1,
				environment: myEnvironment,
				src: "Sprites/pipe-green-flip.png",
				meta: {
					pipePlace: "top",
				},
			});
			currentTopPipe.forceAspectRatio = false;
			const currentBottomPipe = new ImageObject({
				mass: 2,
				position: {
					x: myEnvironment.canvas.width,
					y: myEnvironment.base - bottomHeight,
				},
				velocity: { x: 0, y: 0 },
				base: myEnvironment.base,
				sizeX: 50,
				sizeY: bottomHeight,
				resistance: -1,
				environment: myEnvironment,
				src: "Sprites/pipe-green.png",
				meta: {
					pipePlace: "bottom",
				},
			});
			currentBottomPipe.forceAspectRatio = false;
			myEnvironment.pipes.push(currentTopPipe);
			myEnvironment.pipes.push(currentBottomPipe);
		},
	});
	//Constantly update Environment
	myEnvironment.update({
		interval: 0,
		start: () => {
			myFlappyBird.rotation = Math.min(myFlappyBird.velocity.y / 3, 90);
			for (let pipe of myEnvironment.pipes) {
				pipe.position.x -= 2;
				pipe.drawSoftBody(myEnvironment.context);
				myFlappyBird.drawSoftBody(myEnvironment.context);
				cityBackground.drawSoftBody(myEnvironment.context);
				if (pipe.position.x + pipe.sizeX < 0) {
					myEnvironment.pipes = myEnvironment.pipes.filter((p) => p !== pipe); //Delete pipe
					myEnvironment.objects = myEnvironment.objects.filter(
						(p) => p !== pipe
					); //Delete pipe

					myEnvironment.meta.score += 0.5;
					myScore.text = myEnvironment.meta.score;
					//When gone past a pipe
					/* if (pipe.meta.pipePlace == "top") pipe.position.y -= 7.5;
				else {
					pipe.position.y += 7.5;
				} */
				}
			}
		},
	});
}
getID("startGameButton").addEventListener("click", () => {
	if (!loadedAssets) return;
	getID("introScreen").style.display = "none";
	startGame();
});
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

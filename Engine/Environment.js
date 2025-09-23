import CircleObject from "./Generics/CircleObject.js";

export default class Environment {
	constructor({ base = 700 } = {}) {
		Object.assign(this, { base });

		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		document.body.appendChild(this.canvas);
		this.canvas.style.backgroundColor = "transparent";
		this.canvas.style.border = "4px solid green";
		// Sky blue background
		this.objects = [];
		this.Graphs = []
	}
	addObject(object) {
		this.objects.push(object);
		object.environment = this;
	}
/**
 * @param {Object} functionAttach - Function Parameters
 * @param {number} functionAttach.interval - Delay in Seconds
 * @param {function} functionAttach.start - Function to execute */
	update(functionAttach) {
		let lastTime = performance.now();
		let startTime = lastTime;
		let elapsedFunctionTime = 0;
		let loop = () => {
			const currentTime = performance.now();
			const deltaTime = (currentTime - lastTime) / 1000;
			const elapsedTime = (currentTime - startTime) / 1000;
			elapsedFunctionTime += deltaTime; // Accumulate elapsed time

			if (elapsedTime >= functionAttach.interval) {
				if (elapsedFunctionTime >= functionAttach.interval) {
					//If elapsed time is greater than or equal to interval, run function
					functionAttach.start();
					elapsedFunctionTime = 0; // reset elapsed time for function
				}
			}
			lastTime = currentTime;
			//Render Elements
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.fillStyle = "lightblue";
			//For base line
			this.context.beginPath();
			this.context.moveTo(0, this.base);
			this.context.lineTo(this.canvas.width, this.base);
			this.context.stroke();
			this.context.closePath();
			for (let object of this.objects) {
				object.update(deltaTime);
				//Drawing handled externally
				object.draw(object.environment.context);
				//Fix later: Collision detection $TODO
				/* for (let object2 of this.objects) {
					if (object !== object2 && object.collidesWith(object2)) {
						
						
					object.strokeColor = "red"
						//Registering Collision and 
						if(this.objects.indexOf(object)<this.objects.indexOf(object2)){
						const v1 = (object.velocity.y * (object.mass - object2.mass) + 2 * object2.mass * object2.velocity.y) / (object.mass + object2.mass);
						const v2 = (object2.velocity.y * (object2.mass - object.mass) + 2 * object.mass * object.velocity.y) / (object.mass + object2.mass);
						
						object.velocity.y = v1
						object2.velocity.y = v2
						if(object.position.y<object2.position.y){
						if(object2.height == 0){
							object.base = object2.position.y
							//console.log("Square on circ");
							
							
						}
					}
						
						//console.log("Collision detected between", object, "and", object2);
					}
						else{
							const v2 = (object.velocity.y * (object.mass - object2.mass) + 2 * object2.mass * object2.velocity.y) / (object.mass + object2.mass);
						const v1 = (object2.velocity.y * (object2.mass - object.mass) + 2 * object.mass * object.velocity.y) / (object.mass + object2.mass);
						
						object.velocity.y = v1
						object2.velocity.y = v2
						if(object2.position.y>object.position.y){
						if(object2.height == 0){
							object.base = object2.position.y
							//console.log("Circe on square");
						}
						}
					}
				}
					else{
					

					}
				} */
			}

			for(let graph of this.Graphs){
				graph.draw(this.context)
			}
			requestAnimationFrame(loop);
		};

		loop();
	}
}

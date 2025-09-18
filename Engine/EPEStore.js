import EnergyStore from "./EnergyStore.js";

export default class EPEStore extends EnergyStore {
	constructor({ springConstant } = {}) {
		super();
		Object.assign(this, { springConstant });
		this.type = "EPEStore";
		this.target;
		this.lastEnergy = 0;
	}

	calculate(obj = this.target) {
		return 0.5 * this.springConstant * (obj.height * obj.height); // EPE = 1/2 k x^2
	}

	update(deltaTime) {
		this.energy = this.calculate();

		// Reset event after being read
		if (this.target.EVENT.hitBase.state == true) {
			this.target.EVENT.hitBase.state = false;
			//console.log(this.target.EVENT.hitBase.state);
			//Bounce Effect

			if (this.target.lastKEnergy > this.springConstant / window.innerHeight) {
				//Animation
				//console.log(this.target.velocity.y);

				//
				this.target.position.y -= (0.1+0.2)/3;
				this.target.lastKEnergy *= 0.4;

				this.target.velocity.y =
					this.target.velocity.y || -this.target.lastKEnergy;
				this.target.bodyProps.scaleY = Math.max(
					1 - Math.abs(this.target.velocity.y) / this.springConstant,0.85
				);
			}

			
		}

		this.target.bodyProps.scaleY = Math.min(
			this.target.bodyProps.scaleY + 0.01,
			1
		);
	}
}

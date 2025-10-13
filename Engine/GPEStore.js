import EnergyStore from "./EnergyStore.js";

export class GPEStore extends EnergyStore {
	constructor({ gravity, pixelsPerMeter }) {
		super();
		this.gravity = gravity;
		this.energy;
		this.target;
		this.pixelsPerMeter = pixelsPerMeter;
		this.gravityDigital = this.gravity * this.pixelsPerMeter; // convert gravity to px/s²
	}
	calculate(obj = this.target) {
		return obj.mass * this.gravity * obj.height;
	}
	update(deltaTime) {
		if (this.target.height > 0) {
			this.target.velocity.y += this.gravityDigital * deltaTime;
			this.energy = this.calculate();
		} else {
			if (
				this.target.EVENT.hitBase.state == false &&
				this.target.velocity.y != 0
			) {
				this.target.EVENT.hitBase.state = true;
				this.target.velocity.y = 0;
				this.target.energyResetAllowed = false;
			}
		}
		this.target.position.y += this.target.velocity.y * deltaTime;
	}
}

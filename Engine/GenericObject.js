import CircleObject from "./Generics/CircleObject.js";
import { polygonsCollide } from "./Tools/Tools.js";

export default class GenericObject {
	constructor({
		mass,
		position,
		velocity,
		base,
		resistance,
		environment,
		deformable = false,
	}) {
		this.energyResetAllowed = true;
		Object.assign(this, {
			mass,
			position,
			velocity,
			resistance,
			environment,
			deformable,
		});
		this.base = base ?? position.y;
		this.energyStores = [];

		this.bodyProps = { scaleX: 1, scaleY: 1 };
		this.EVENT = {
			hitBase: {
				state: false,
				toggle: function () {
					this.EVENT.hitBase.state = !this.EVENT.hitBase.state;
				},
			},
		};
		this.environment?.addObject(this);
	}
	attachEnergyStore(energyStore) {
		this.energyStores.push(energyStore);
		energyStore.target = this;
	}
	drawSoftBody(context) {
		
		context.strokeStyle = this.strokeColor??"black"
		const polygon = this.toPolygon();
		

		context.beginPath();
		context.moveTo(polygon[0].x, polygon[0].y);
		for (let point of polygon) {
			context.lineTo(point.x, point.y);
		}
		
		context.closePath();
		
		context.stroke();
		this.strokeColor = "black"
	}
	toPolygon() {
		throw new Error("toPolygon() must be implemented in subclasses");
	}
	update(deltaTime) {
		this.height = this.base - (this.position.y + this.sizeY);
		this.customUpdate();
		for (const store of this.energyStores) {
			store.update(deltaTime);
		}
	}
	customUpdate() {
		return;
	}
	collidesWith(other) {
		let validCollision = polygonsCollide(this.toPolygon(), other.toPolygon());
			
		return validCollision;
	}
}

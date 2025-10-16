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
		rotation,
		meta
	}) {
		this.energyResetAllowed = true;
		Object.assign(this, {
			mass,
			position,
			velocity,
			resistance,
			environment,
			deformable,
			rotation,
			meta
		});
		this.base = base ?? position.y;
		this.energyStores = [];
		this.keyBinds = {};
		this.bodyProps = { scaleX: 1, scaleY: 1 };
		this.EVENT = {
			hitBase: {
				state: false,
				trigger: function () {
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
		context.strokeStyle = this.strokeColor ?? "black";
		const polygon = this.toPolygon();

		context.beginPath();
		context.moveTo(polygon[0].x, polygon[0].y);
		for (let point of polygon) {
			context.lineTo(point.x, point.y);
		}

		context.closePath();

		context.stroke();
		this.strokeColor = "black";
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

	addEventListener(event, callback) {
		this.EVENT[event.toUpperCase()] = this.EVENT[event.toUpperCase()] || {
			state: false,
			trigger: callback,
		};
	}
	dispatchEvent(event, ...args) {
		this.EVENT[event.toUpperCase()]?.trigger(this, ...args);
	}
	addKeyBind({ key: inputKey, start: start, active = true, desc = "generic" }) {
		this.keyBinds[inputKey.toLowerCase()] =
			this.keyBinds[inputKey.toLowerCase()] || [];
		this.keyBinds[inputKey.toLowerCase()].push({ name: desc, start });
		this.keyBinds[inputKey.toLowerCase()].active = active;
		//
		window.addEventListener("keypress", (e) => {
			if (e.key.toLowerCase() == inputKey.toLowerCase()) {
				if (!this.keyBinds[inputKey].active) return;
				this.keyBinds[inputKey].forEach((bind) => bind.start());
			}
		});
	}
}

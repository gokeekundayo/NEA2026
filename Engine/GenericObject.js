import { polygonsCollide } from "./Tools/Tools.js";

export default class GenericObject {
	constructor({ mass, position, velocity, base, resistance, environment }) {
		Object.assign(this, { mass, position, velocity, resistance, environment });
		this.base = base ?? position.y;
		this.energyStores = [];
		this.environment?.addObject(this);
	}
	attachEnergyStore(energyStore) {
		this.energyStores.push(energyStore);
		energyStore.target = this;
	}

	update(deltaTime) {
		this.height = this.base - this.position.y;
		for (const store of this.energyStores) {
			store.update(deltaTime);
		}
	}

	collidesWith(other) {
		return polygonsCollide(this.toPolygon(), other.toPolygon());
	}
}

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
		return polygonsCollide(this.toPolygon(), other.toPolygon());
	}
}

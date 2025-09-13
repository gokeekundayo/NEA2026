import GenericObject from "../GenericObject.js";
export default class SquareObject extends GenericObject {
	constructor({ sizeX = 100, sizeY = 100, ...rest }) {
		super(rest);
		Object.assign(this, { sizeX, sizeY });
	}

	draw(context) {
		context.fillStyle = "green";
		context.fillRect(this.position.x, this.position.y, this.sizeX, this.sizeY);
	}
	toPolygon() {
		return [
			{ x: this.x, y: this.y },
			{ x: this.x + this.sizeX, y: this.y },
			{ x: this.x + this.sizeX, y: this.y + this.sizeY },
			{ x: this.x, y: this.y + this.sizeY },
		];
	}
}

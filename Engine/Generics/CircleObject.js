import GenericObject from "../GenericObject.js";

export default class CircleObject extends GenericObject {
	constructor({ radius = 50, ...rest }) {
		super(rest);
		Object.assign(this, { radius });
		this.sizeX = this.sizeY = this.radius * 2;
	}
	draw(context) {
		context.fillStyle = "blue";
		if (this.softBody) {


			this.drawSoftBody(context);
			return;
		}
		context.beginPath();
		context.arc(
			this.position.x + this.radius,
			this.position.y + this.radius,
			this.radius,
			0,
			Math.PI * 2
		);
		context.fill();
	}

	toPolygon() {
		const points = [];
		this.bodyProps.scaleX = 1 / Math.sqrt(this.bodyProps.scaleY);
		for (let i = 0; i < 512; i++) {
			const angle = (i / 512) * Math.PI * 2;
			points.push({
				x:
					this.position.x +
					Math.cos(angle) * this.radius * this.bodyProps.scaleX +
					this.radius,
				y:
					this.position.y +
					Math.sin(angle) * this.radius * this.bodyProps.scaleY +
					this.radius,
			});
		}
		return points;
	}
}

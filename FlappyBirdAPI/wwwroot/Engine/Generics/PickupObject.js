import CircleObject from "./CircleObject.js";

export class PickupObject extends CircleObject {
	constructor({ radius = 20, color = "#E1B530", ...rest }) {
		super(rest);
		this.angle = 0;
		this.color = color;
		this.noClip = true;
		this.radius = radius;
	}
	draw(context) {
		context.save();
		context.translate(this.position.x, this.position.y); // move to center
		context.scale(Math.cos(this.angle), 1); // fake X-axis rotation

		context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI * 2);
		context.fillStyle = this.color;
		context.fill();
		context.restore();

		this.angle += 0.05;
	}
}

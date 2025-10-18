import SquareObject from "./SquareObject.js";

export default class ImageObject extends SquareObject {
	constructor({ src, ...rest }) {
		super(rest);
		Object.assign(this, { src });
		this.forceAspectRatio = true;
		this.forceActualImage;
		this.imageElement = this.environment.meta.Assets[this.src];

		this.initialAspectRatio =
			this.imageElement.width / this.imageElement.height;
	}

	draw(context) {
		let angle = (this.rotation * Math.PI) / 180;
		context.save();
		context.translate(
			this.position.x + this.sizeX / 2,
			this.position.y + this.sizeY / 2
		);
		context.rotate(angle);
		if (this.forceActualSize) {
			context.drawImage(
				this.imageElement,
				0,
				0,
				this.imageElement.width,
				this.imageElement.height,
				-this.imageElement.width / 2,
				-this.imageElement.height / 2,
				this.imageElement.width,
				this.imageElement.height
			);
		} else {
			if (this.forceAspectRatio) {
				let drawSizeX = this.sizeY * this.initialAspectRatio;
				context.drawImage(
					this.imageElement,
					0,
					0,
					this.imageElement.width,
					this.imageElement.height,
					-drawSizeX / 2,
					-this.sizeY / 2,
					drawSizeX,
					this.sizeY
				);
			} else {
				context.drawImage(
					this.imageElement,
					0,
					0,
					this.imageElement.width,
					this.imageElement.height,
					-this.sizeX / 2,
					-this.sizeY / 2,
					this.sizeX,
					this.sizeY
				);
			}
		}
		context.restore();
	}
}

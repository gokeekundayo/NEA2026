import SquareObject from "./SquareObject.js";

export default class ImageObject extends SquareObject {
	constructor({ src, ...rest }) {
		super(rest);
		Object.assign(this, { src });

		this.imageElement = new Image();
		this.imageElement.src = this.src;
	}

	draw(context) {
		context.drawImage(
			this.imageElement,
			0,
			0,
			this.imageElement.width,
			this.imageElement.height,
			this.position.x,
			this.position.y,
			this.imageElement.width,
			this.imageElement.height
		);
	}
}

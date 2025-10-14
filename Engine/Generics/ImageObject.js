import SquareObject from "./SquareObject.js";

export default class ImageObject extends SquareObject {
	constructor({ src, ...rest }) {
		super(rest);
		Object.assign(this, { src });
		this.forceAspectRatio = true;
		this.forceActualImage;
		this.imageElement = new Image();
		this.imageElement.src = this.src;
		this.initialAspectRatio = this.imageElement.width/this.imageElement.height
	}

	draw(context) {
		if(this.forceActualSize){
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
		else{
			if(this.forceAspectRatio){
				let drawSizeX = this.sizeY*this.initialAspectRatio
			context.drawImage(
				this.imageElement,
				0,
				0,
				this.imageElement.width,
				this.imageElement.height,
				this.position.x,
				this.position.y,
				drawSizeX,
				this.sizeY,  	
			);}
		}
		
	}
}

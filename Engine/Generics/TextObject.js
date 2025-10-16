import GenericObject from "../GenericObject.js";

export class TextObject extends GenericObject {
	constructor({
		text,
		fontSize = 20,
		color = "black",
		fontFamily = "Arial",
		textAlign = "left",
		...rest
	}) {
		super(rest);
		Object.assign(this, { text, fontSize, color, fontFamily, textAlign });
	}

	draw(context) {
		context.font = `${this.fontSize}px ${this.fontFamily}`;
		context.fillStyle = this.color;
		context.textAlign = this.textAlign;
		context.fillText(this.text, this.position.x, this.position.y);
	}
	toPolygon() {
		return [];
	}
}

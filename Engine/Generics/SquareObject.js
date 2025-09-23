import GenericObject from "../GenericObject.js";
export default class SquareObject extends GenericObject {
	constructor({ sizeX = 100, sizeY = 100, ...rest }) {
		super(rest);
		Object.assign(this, { sizeX, sizeY });
	}

	draw(context) {
		context.fillStyle = "green";
		if (this.softBody) {
		

			this.drawSoftBody(context);
			return;
		}
		context.fillRect(this.position.x, this.position.y, this.sizeX, this.sizeY);
	}
	toPolygon() {
		return [
			{ x: this.position.x, y: this.position.y },
			{ x: this.position.x + this.sizeX, y: this.position.y },
			{ x: this.position.x + this.sizeX, y: this.position.y + this.sizeY },
			{ x: this.position.x, y: this.position.y + this.sizeY },
		];
	}
	/**
	 * 
	 * @param {string} key - Key Input
	 * @param {function} start - Function to be executed 
	 */
	addKeyBind({key:inputKey, start:start}){
		window.addEventListener("keypress",(e)=>{
			if(e.key.toLowerCase()==inputKey.toLowerCase()){
				start()
			}
		})
	}
}

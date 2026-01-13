export class PlayerScore {
	constructor(name, score) {
		this.name = name;
		this.score = score;

		this.element = document.createElement("div");
		this.element.classList.add("scoreItem");

		this.nameElement = document.createElement("span");
		this.nameElement.classList.add("playerName");
		this.nameElement.innerText = this.name + ":";
		this.scoreElement = document.createElement("span");
		this.scoreElement.classList.add("playerScore");
		this.scoreElement.innerText = this.score;
		this.element.appendChild(this.nameElement);
		this.element.appendChild(this.scoreElement);
	}
	updateScore(newScore) {
		this.score = newScore;
		this.scoreElement.innerText = this.score;
	}
	updateName(newName) {
		this.name = newName;
		this.nameElement.innerText = this.name + ":";
	}
}

export class Room {
	constructor({ parent, ID, name, maxPlayers, currentPlayers }) {
		this.parent = parent;
		this.ID = ID;
		this.name = name;
		this.maxPlayers = maxPlayers;
		this.currentPlayers = currentPlayers;
		//

		this.element = document.createElement("div");
		this.element.classList.add("roomContainer");
		this.element.innerHTML = `
            <div class="roomInfo">
                <div class="roomName roomItem" >${this.name}</div>
                <div class="roomPlayers roomItem">Players: ${
									Object.keys(this.currentPlayers).length
								}/${this.maxPlayers}</div>
            </div>
            <div class="joinButtonContainer" ><button class="joinButton" route="GameScreen">Join</button></div>
        `;
		this.parent.appendChild(this.element);
	}
}

import ImageObject from "../Engine/Generics/ImageObject.js";
import { Room } from "../Engine/Tools/Room.js";
import { ServerRequest } from "../Engine/Tools/ServerRequest.js";
import { getID } from "../Engine/Tools/Tools.js";
import { myEnvironment, startGame, takeRoute } from "./index.js";
const connection = new signalR.HubConnectionBuilder()
	.withUrl("/gameHub") // your API URL
	.build();
const GameHubRequest = new ServerRequest(connection);
let connectionID;
let playerList;
GameHubRequest.addEventListener("PlayerList", (PlayerList) => {
	console.log("Current Players:", PlayerList);
	Object.entries(PlayerList).forEach(([connectionId, player]) => {
		console.log(myEnvironment);

		if (connectionId == connectionID) {
			return;
			console.log(myEnvironment.meta);
		}
		let newPlayer = new ImageObject({
			mass: 2,
			position: { x: player.position.X, y: player.position.Y },
			velocity: { x: 0, y: 0 },
			base: myEnvironment.base,
			sizeX: 70,
			sizeY: 70,
			resistance: -1,
			environment: myEnvironment,
			src: "flappybirdskin.png",
			rotation: 0,
			meta: { connectionId: connectionId },
		});
		console.log(newPlayer.imageElement);
		//
	});
});
GameHubRequest.addEventListener("PlayerUpdated", (connectionId, position) => {
	console.log("Player Updated:", connectionId, position);
	myEnvironment.objects.forEach((obj) => {
		if (obj.meta?.connectionId == connectionId) {
			console.log("ss");

			obj.position.x = position.X;
			obj.position.y = position.Y;
		}
	});
}); //Not in use
let username;
connection.start().then(() => {
	getID("loginButton").addEventListener("click", () => {
		GameHubRequest.send("JoinGame", [getID("usernameInput").value]);
		GameHubRequest.send("GetPlayers", [getID("usernameInput").value]);
		GameHubRequest.send("GetRoomList", []);
		username = getID("usernameInput").value;
	});
	GameHubRequest.addEventListener("GameJoined", (message) => {
		connectionID = message.ConnectionID;
		/* myEnvironment.update({
				interval: 0,
				start: () => {
					if (myEnvironment.meta.player) {
						//console.log(myEnvironment.meta.player);

						GameHubRequest.send("UpdatePosition", [
							connectionID,
							{
								X: myEnvironment.meta.player.position.x,
								Y: myEnvironment.meta.player.position.y,
							},
						]);
					}
				},
			}); */
	});
	//Get Rooms
	GameHubRequest.addEventListener("ReceiveRoomList", (rooms) => {
		//Create HTML Element
		console.log(rooms);

		rooms.forEach((room) => {
			let currentRoom = new Room({
				parent: getID("roomList"),
				ID: room.roomID,
				name: room.roomName,
				maxPlayers: room.maxPlayers,
				currentPlayers: room.players,
			});
			currentRoom.element
				.querySelector(".joinButton")
				.addEventListener("click", () => {
					console.log(username);

					connection
						.invoke("JoinRoom", room.roomID, username)
						.then((response) => {
							console.log(response);

							if (response.valid) {
								console.log("Joined Room:", room.roomID);
								console.log(
									currentRoom.element.querySelectorAll(".roomPlayers")
								);

								currentRoom.element.querySelectorAll(
									".roomPlayers"
								)[0].innerText =
									"Players: " + response.size + "/" + room.maxPlayers;
							}
							takeRoute(currentRoom.element.querySelector(".joinButton"));
						});
				});
		});
	});
});

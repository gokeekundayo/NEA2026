import ImageObject from "../../Engine/Generics/ImageObject.js";
import { PlayerScore } from "../../Engine/Tools/PlayerScore.js";
import { Room } from "../../Engine/Tools/Room.js";
import { ServerRequest } from "../../Engine/Tools/ServerRequest.js";
import { getID } from "../../Engine/Tools/Tools.js";
import { myEnvironment, startGame, takeRoute } from "./index.js";
const connection = new signalR.HubConnectionBuilder()
	.withUrl("/gameHub") // your API URL
	.build();
const GameHubRequest = new ServerRequest(connection);
let connectionID;
let playerList;
let currentRoomLocal;
GameHubRequest.addEventListener("PlayerList", (PlayerList) => {
	console.log("Current Players:", PlayerList);
	Object.entries(PlayerList).forEach(([connectionId, player]) => {
		console.log(myEnvironment);

		if (connectionId == connectionID) {
			return;
			console.log(myEnvironment.meta);
		}
		/* let newPlayer = new ImageObject({
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
		}); */
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
				scores: {},
			});
			currentRoomLocal = currentRoom
			currentRoom.element
				.querySelector(".joinButton")
				.addEventListener("click", () => {
					console.log(username);
					////
					connection
						.invoke("JoinRoom", room.roomID, username)
					
					///
					GameHubRequest.addEventListener("JoinRoom",(response)=>{
						let internalPlayerJoined = response.source.connectionID==connectionID
						//Check if this client that joined
						console.log(internalPlayerJoined);
						
						if (response.valid) {
							
						if(internalPlayerJoined){ //You join a room

							console.log("Joined Room:", room.roomID);
							console.log(
								currentRoom.element.querySelectorAll(".roomPlayers")
							);

							currentRoom.element.querySelectorAll(
								".roomPlayers"
							)[0].innerText =
								"Players: " + response.size + "/" + room.maxPlayers;
						
						takeRoute(currentRoom.element.querySelector(".joinButton")); //Entering the room environment on the frontend
						startGame();
						Object.entries(response.room.players).forEach(
							([playerConnectionID, player]) => {
								if (playerConnectionID == connectionID) {
									return;
								}
								let scoreElement = new PlayerScore(
									player.username,
									player.score
								);
								console.log("Adding new score element");
								
								getID("scoresContainer").appendChild(scoreElement.element);
							}
						);
						//Start updating scores
						myEnvironment.update({
							interval: 1750 / 1000,
							start: () => {
								console.log(myEnvironment.meta.score);

								if (myEnvironment.meta.score) {
									//console.log(myEnvironment.meta);})
									GameHubRequest.send("UpdateScore", [
										connectionID,
										myEnvironment.meta.score,
									]);
								}
							},
						});
					}
						else{
						//If other player joined room
						currentRoom.scores[response.source.connectionID] = new PlayerScore(
							currentRoom.currentPlayers[response.source.connectionID].username,
							Number(score)
						);

						getID("scoresContainer").appendChild(
							currentRoom.scores[response.source.connectionID].element
						);
						console.log("Other player joined")
					}//Only runs if valid response
					
						currentRoomLocal = currentRoom //This is the room that the current client has joined
					}
				
					})
						
					GameHubRequest.addEventListener(
						"PlayerScoreUpdated",
						(connectionId, score) => {
							console.log(currentRoom.scores);

							if (currentRoom.scores[connectionId]) {
								currentRoom.scores[connectionId].updateScore(Number(score));
							} else {
								currentRoom.scores[connectionId] = new PlayerScore(
									currentRoom.currentPlayers[connectionId].username,
									Number(score)
								);

								getID("scoresContainer").appendChild(
									currentRoom.scores[connectionId].element
								);
							}
							currentRoomLocal = currentRoom //This is the room that the current client has joined
							
						}
						
						//Current bug is that this refreshes all scores when a new player score is added, rather than synchrronizing existing scores only
					);
					GameHubRequest.addEventListener("OtherJoinedRoom",(room,source)=>{
						
						
						console.log("hhh",source)
						
							currentRoom.scores[source] = new PlayerScore(
								currentRoom.currentPlayers[source].username,
								Number(score)
							);

							getID("scoresContainer").appendChild(
								currentRoom.scores[source].element
							);
							console.log(
								currentRoom.scores[source]
							)
							
						
					})
				});
		});

		
	});
	

});
//Adding player scores

import ImageObject from "../Engine/Generics/ImageObject.js";
import { ServerRequest } from "../Engine/Tools/ServerRequest.js";
import { getID } from "../Engine/Tools/Tools.js";
import { myEnvironment } from "./index.js";
const connection = new signalR.HubConnectionBuilder()
	.withUrl("/gameHub") // your API URL
	.build();
const GameHubRequest = new ServerRequest(connection);
let connectionID;
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
		});
		console.log(newPlayer.imageElement);
	});
});
GameHubRequest.addEventListener("GameJoined", (message) => {
	connectionID = message.ConnectionID;
});
connection
	.start()
	.then(() => {
		getID("loginButton").addEventListener("click",()=>{
			GameHubRequest.send("JoinGame", [getID("usernameInput").value]);
		GameHubRequest.send("GetPlayers", [getID("usernameInput").value]);
		})
	})
	.catch((err) => console.error(err));

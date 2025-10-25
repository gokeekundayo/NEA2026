import ImageObject from "../Engine/Generics/ImageObject.js";
import { ServerRequest } from "../Engine/Tools/ServerRequest.js";
const connection = new signalR.HubConnectionBuilder()
	.withUrl("/gameHub") // your API URL
	.build();
const GameHubRequest = new ServerRequest(connection);
let connectionID;
GameHubRequest.addEventListener("PlayerList", (PlayerList) => {
	console.log("Current Players:", PlayerList);
});
GameHubRequest.addEventListener("GameJoined", (message) => {
	connectionID = message.ConnectionID;
});
connection
	.start()
	.then(() => {
		GameHubRequest.send("JoinGame", ["Player1"]);
		GameHubRequest.send("GetPlayers", ["Player1"]);
	})
	.catch((err) => console.error(err));

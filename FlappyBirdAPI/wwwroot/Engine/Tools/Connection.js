import { ServerRequest } from "./ServerRequest.js";
export const connection = new signalR.HubConnectionBuilder()
	.withUrl("/assetsHub") // your API URL
	.build();

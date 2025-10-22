const connection = new signalR.HubConnectionBuilder()
	.withUrl("/assetsHub") // your API URL
	.build();

connection
	.start()
	.then(() => console.log("Connected to SignalR hub"))
	.catch((err) => console.error(err));

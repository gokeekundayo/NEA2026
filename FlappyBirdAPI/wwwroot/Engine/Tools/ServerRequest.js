export class ServerRequest {
	constructor(connection) {
		Object.assign(this, { connection });
	}

	send(type, data) {
		this.connection.invoke(type, ...data).catch((err) => console.error(err));
	}
	addEventListener(event, callback) {
		this.connection.on(event, callback);
	}
}

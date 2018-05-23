import window from 'global';
const globalPalmServiceBridges = [];
const globalResponse = {};

class MockPalmServiceBridge {
	constructor () {
		this.id = globalPalmServiceBridges.length;
		this.uri = '';
		this.params = '';
		this.onservicecallback = null;
		globalPalmServiceBridges.push({
			id: this.id,
			uri: this.uri,
			params: this.params
		});
	}

	call (uri, params) {
		globalPalmServiceBridges[this.id].uri = uri;
		globalPalmServiceBridges[this.id].params = params;

		if (globalResponse[uri]) {
			this.onservicecallback(JSON.stringify(globalResponse[uri]));
		}
	}

	cancel () {

	}
}

export class PalmServiceBridgeMock {
	constructor () {
		this.RealPalmServiceBridge = window.PalmServiceBridge;
	}

	setup () {
		window.PalmServiceBridge = MockPalmServiceBridge;
		this.reset();
	}

	teardown () {
		this.reset();
		window.PalmServiceBridge = this.RealPalmServiceBridge;
	}

	reset () {
		globalPalmServiceBridges.length = 0;
		for (let member in globalResponse) {
			delete globalResponse[member];
		}
	}

	getPalmServiceBridges () {
		return globalPalmServiceBridges;
	}

	send (uri, response) {
		globalResponse[uri] = response;
	}
}

export default new PalmServiceBridgeMock();

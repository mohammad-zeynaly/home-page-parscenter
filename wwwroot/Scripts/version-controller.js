const versionController = {
	getCurrentLocalVersion() {
		return localStorage.getItem('CurrentVersionCode');
	},
	updateLocalVersion(serverVersion) {
		localStorage.setItem('CurrentVersionCode', serverVersion);
	},
	isLocalVersionOutdated(serverVersion) {
		let currentLocalVersion = this.getCurrentLocalVersion();
		return parseInt(currentLocalVersion) < parseInt(serverVersion);
	},
	userHasLocalVersion() {
		return this.getCurrentLocalVersion() !== null;
	}
}
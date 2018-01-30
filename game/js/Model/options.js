class Options {
	constructor() {
		//					 Up, Down, Left, Right
		this.directionalKeys = [38, 40, 37, 39];
		this.interactionKey = 32;
	}
	
	getDirectionalKeys() {
		return this.directionalKeys;
	}
	
	getInteractionKey() {
		return this.interactionKey;
	}
}
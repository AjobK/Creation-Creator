class StartMenu {
	constructor() {
		this.headings = ["Start game", "Options", "Credits"];
		this.activeHeading = 0;
	}
	
	getHeadings() {
		return this.headings;
	}
	
	getActiveHeading() {
		return this.activeHeading;
	}
	
	setActiveHeading(direction) {
		direction == "next" ? this.activeHeading++ : this.activeHeading--;
		
		if (this.activeHeading >= this.headings.length) {
			this.activeHeading = 0;
		} else if (this.activeHeading < 0) {
			this.activeHeading = this.headings.length - 1;
		}
		
		console.log(this.activeHeading);
	}
}
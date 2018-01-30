class Character {
	constructor(x, y) {
		this.x = x * 36;
		this.y = y * 36;
		this.pose = ["idle","down", 0];
	}
	
	getX() {
		return this.x;
	}
	
	changeX(amount) {
		this.x += amount;
	}
	
	changeY(amount) {
		this.y += amount;
	}
	
	getY() {
		return this.y;
	}
	
	getPose() {
		return this.pose;
	}
	
	changeActivity(activity) {
		this.pose[0] = activity;
	}
	
	changeDirection(direction) {
		this.pose[1] = direction;
	}
	
	addToPose() {
		if (this.pose[0] == "idle") {
			this.pose[2] >= 9 ? this.pose[2] = 0 : this.pose[2]++; 
		} else {
			this.pose[2] >= 7 ? this.pose[2] = 0 : this.pose[2]++;
		}
	}
	
	resetPoseCount() {
		this.pose[2] = 0;
	}
	
	move(mapMeasurements) {
		this.pose[0] = "walking";
		mapMeasurements[0]--;
		mapMeasurements[1]--;
		switch (this.pose[1]) {
			case "up":
				if (this.y > 0) this.changeY(-1);
				break;
			case "down":
				if (this.y < mapMeasurements[1] * 36) this.changeY(1);
				break;
			case "left":
				if (this.x > 0) this.changeX(-1);
				break;
			case "right":
				if (this.x < mapMeasurements[0] * 36 - 2) this.changeX(1);
				break;
		}
	}
}
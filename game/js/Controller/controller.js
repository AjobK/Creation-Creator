class Controller {
	constructor() {
		this.startMenu = new StartMenu();
		this.options = new Options();
		this.scene = "Menu";
		this.mapManager = new MapManager();
		this.character = new Character(0, 0);
		
		this.startPoints = [0,0];
		
		this.view = new View(this, this.mapManager.getCurrentMap(), this.character);
		
		this.characterMovementCondition = false;
		this.characterMovementInterval= setInterval(function(e) {
			controller.character.addToPose();
		}, 200);
		
		this.movementKeyIsDown = false;
		
		this.setScene();
		
		window.addEventListener("keydown", function(e) {
			if (controller.scene == "Menu") {
				var hasMatchedKey = true;
				
				switch (e.keyCode) {					
					case controller.options.getDirectionalKeys()[0]: //	Up
						controller.startMenu.setActiveHeading("previous");
						break;
					case controller.options.getDirectionalKeys()[1]: // Down
						controller.startMenu.setActiveHeading("next");
						break;
					case controller.options.getInteractionKey(): // Left
						if (controller.startMenu.getActiveHeading() == 0) {
							controller.fadeOutScene(1000);
							setTimeout(function(e) {
								controller.switchScene("Game");
								controller.setScene();
								controller.fadeInScene(300);
							}, 1500);
						} else {
							window.alert("Not working yet");
						}
						break;
				}
				
				if (hasMatchedKey) controller.setScene();
				
				controller.setScene();
			} else if (controller.scene == "Game") {
				var hasMatchedKey = true;
				
				if (!controller.movementKeyIsDown) {
					switch (e.keyCode) {				
						case controller.options.getDirectionalKeys()[0]: //	Up
							controller.character.changeDirection("up");
							break;
						case controller.options.getDirectionalKeys()[1]: // Down
							controller.character.changeDirection("down");
							break;
						case controller.options.getDirectionalKeys()[2]: // Left
							controller.character.changeDirection("left");
							break;
						case controller.options.getDirectionalKeys()[3]: // Right
							controller.character.changeDirection("right");
							break;
						default:
							hasMatchedKey = false;
							// ???
							break;
					}
					
					if (hasMatchedKey) {
						controller.movementKeyIsDown = true;
						controller.setGame();
						controller.startMovingCharacter();
						
						window.addEventListener("keyup", function(e) {
							if (controller.characterMovementCondition) {
								controller.stopMovingCharacter();
								console.log("Stopped");
								
								controller.movementKeyIsDown = false;
								
								controller.characterMovementCondition = false;
								controller.setGame();
							}
						});
					}
				}
			}
		});
	}
	
	switchScene(scene) {
		this.scene = scene;
	}
	
	fadeOutScene(duration) {
		var canvas = this.view.canvas;
		var sceneOpacity = 1;
		var fadeOut = setInterval(function(e) {
			sceneOpacity -= 1 / (duration / 10);
			canvas.style.opacity = sceneOpacity;
			if (sceneOpacity <= 0) {
				clearInterval(fadeOut);
			}
		}, 10);
	}
	
	fadeInScene(duration) {
		var canvas = this.view.canvas;
		var sceneOpacity = 0;
		var fadeIn = setInterval(function(e) {
			sceneOpacity += 1 / (duration / 10);
			canvas.style.opacity = sceneOpacity;
			if (sceneOpacity >= 1) {
				clearInterval(fadeIn);
			}
		}, 10);
	}
	
	startMovingCharacter() {
		clearInterval(this.characterMovementInterval);
		controller.character.resetPoseCount();
		if (!this.characterMovementCondition) {
			var aCounter = 0;
			
			this.characterMovementInterval = setInterval(function(e) {
				aCounter++;
					controller.character.move(controller.mapManager.getCurrentMapMeasurements());
					if (aCounter % 30 == 0) controller.character.addToPose();
					
					/* console.log("Player X&Y: " + controller.character.getX() +" & " + controller.character.getY()); */
					controller.setGame();
					
			}, 8);
			console.log("Moving");
		}
		
		this.characterMovementCondition = true;
	}
	
	stopMovingCharacter() {
		clearInterval(this.characterMovementInterval);
		controller.character.resetPoseCount();
		this.character.changeActivity("idle");
		this.characterMovementInterval = setInterval(function(e) {
			var idleAnimation = setInterval(function(e) {
				controller.character.addToPose();
				
				console.log(controller.character.getPose());

				controller.setGame();
				if (controller.character.getPose()[2] == 0 || controller.character.getPose()[0] != "idle") {
					clearInterval(idleAnimation);
				}
			}, 200);
		}, 8000);
	}
	
	setScene() {
		this.view.clearCanvas();
		
		switch(this.scene) {
			case "Menu":
				this.setStartMenu(34);
				break;
			case "Game":
				this.setGame();
				break;
			case "Options":
			
				break;
			case "Credits":
			
				break;
		}
	}
	
	setStartMenu(textSize) {
		this.view.addMenu(textSize, this.startMenu.getHeadings(), this.startMenu.getActiveHeading());
	}
	
	setGame() {
		var thisClass = this;
		thisClass.view.createGame();
		thisClass.view.drawCharacter(thisClass.character.getX(), thisClass.character.getY(), thisClass.character.getPose());
	}
	
	setOptions() {
		
	}
	
	setCredits() {
		
	}
}
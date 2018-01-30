class View {
	constructor(controller, currentMap, character) {
		this.canvas = document.getElementById("myCanvas");
		this.ctx = this.canvas.getContext("2d");
		
		//this.drawingStartPoints = [[0],[0]];
		this.currentMap = currentMap;
		this.character = character;
		
		// Set canvas in middle of screen
		this.canvas.parentElement.style.marginTop = (window.innerHeight - 402) / 2 + "px";
		this.canvas.parentElement.style.marginBottom = (window.innerHeight - 402) / 2 + "px";
		
		window.addEventListener("resize", function(e) {
			controller.view.canvas.parentElement.style.marginTop = (window.innerHeight - 402) / 2 + "px";
			controller.view.canvas.parentElement.style.marginBottom = (window.innerHeight - 402) / 2 + "px";		
		});
	}
	
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	addMenu(textSize, theHeadings, activeHeading) {
		var yPosition = (this.canvas.height - (theHeadings.length * (textSize + 5) / 2)) / 2;
		for (var x = 0; x < theHeadings.length; x++) {
			this.ctx.font = textSize + "px BlockyFont";
			this.ctx.textAlign = "center";
			this.ctx.shadowColor = "black";
			this.ctx.shadowBlur = 7;
			x === activeHeading ? this.ctx.fillStyle = "white" : this.ctx.fillStyle = "rgba(255,255,255,0.7)";
			this.ctx.fillText(theHeadings[x], this.canvas.width / 2, yPosition);
			yPosition += textSize + 5;
		}
	}
	
	createGame() {
		//this.clearCanvas();
		// Draw character
		this.ctx.shadowBlur = 0;
		
		
		
		var ctx = this.ctx;
		var thisElement = this;
		var terrainSheet = new Image();
		terrainSheet.src = "img/textures.png";
		
		terrainSheet.onload = function(e) {
			for (var y = 0; y < thisElement.currentMap.length; y++) {
				for (var x = 0; x < thisElement.currentMap[y].length; x++) {
					ctx.shadowBlur = 0;
					
					var theCoords = [];
					
					// Camera locked left
					if (thisElement.character.getX() < thisElement.canvas.width / 2 - 22) {
						theCoords[0] = x * 36;
					// Camera locked right	
					} else if (thisElement.character.getX() > thisElement.currentMap[y].length * 36 - thisElement.canvas.width / 2 - 22) {
						theCoords[0] = x * 36 - thisElement.currentMap[y].length * 36 + thisElement.canvas.width;
					// Camera free
					} else {
						theCoords[0] = x * 36 - thisElement.character.getX() + thisElement.canvas.width / 2 - 22;
					}
					
					if (thisElement.character.getY() < thisElement.canvas.height / 2 - 44) {
						theCoords[1] = y * 36;
					} else if (thisElement.character.getY() > thisElement.currentMap.length * 36 - thisElement.canvas.height / 2 - 44) {
						theCoords[1] = y * 36 - thisElement.currentMap.length * 36 + thisElement.canvas.height;
					} else {
						theCoords[1] = y * 36 - thisElement.character.getY() + thisElement.canvas.height / 2 - 44;
					}
					ctx.drawImage(this, (thisElement.currentMap[y][x] * 36) % 360, Math.floor(thisElement.currentMap[y][x] * 36 / 360) * 36, 36, 36, theCoords[0], theCoords[1], 36, 36);
				}
			}
		}
	}
	
	drawCharacter(x, y, charPose) {
		this.ctx.beginPath();
		var ctx = this.ctx;
		var thisElement = this;
		var character = new Image();
		var shadow = new Image();
		character.src = "img/char/charsprite.png";
		shadow.src = "img/char/shadow.png";
		
		var yPositionOfImage = 0;
			
		switch(charPose[1]) {
			case "up":
				yPositionOfImage += 0;
				break;
			case "down":
				yPositionOfImage += 1;
				break;
			case "left":
				yPositionOfImage += 2;
				break;
			case "right":
				yPositionOfImage += 3;
				break;
		}
		
		switch(charPose[0]) {
			case "idle":
				yPositionOfImage += 0;
				break;
			case "walking":
				yPositionOfImage += 4;
				break;
		}
		
		character.onload = function(e) {
			ctx.shadowColor = "rgba(0,0,0,0.7)";
			ctx.shadowBlur = 10;
			var theCoords = [];
			
			if (thisElement.character.getX() < thisElement.canvas.width / 2 - 22) {
				theCoords[0] = thisElement.character.getX();
			} else if (thisElement.character.getX() > thisElement.currentMap[0].length * 36 - thisElement.canvas.width / 2 - 22) {
				theCoords[0] = thisElement.character.getX() - (thisElement.currentMap.length * 36) - 157;
				qNot("Out of area");
			} else {
				theCoords[0] = thisElement.canvas.width / 2 - 22;
			}
			
			if (thisElement.character.getY() < thisElement.canvas.height / 2 - 44) {
				theCoords[1] = thisElement.character.getY() - 44;
			} else if (thisElement.character.getY() > thisElement.currentMap.length * 36 - thisElement.canvas.height / 2 - 44) {
				theCoords[1] = thisElement.character.getY();
			} else {
				theCoords[1] = thisElement.character.getY();
			}
			
			ctx.drawImage(this, charPose[2] * 40, yPositionOfImage * 80, 40, 80, theCoords[0], theCoords[1], 40, 80);	
			
			// Doesn't work well yet
			/* shadow.onload = function(e) {
				ctx.drawImage(this, 0, 0, 40, 24, thisElement.canvas.width / 2 - 22, thisElement.canvas.height / 2 + 20, 40, 24);
				console.log("loaded");
			} */
			
			ctx.font = "12px Arial";
			ctx.fillText("X: " + x + "\nY: " + y , document.getElementById("myCanvas").width / 2, 20);
			ctx.fillText("X: " + theCoords[0] + "\nY: " + theCoords[1] , document.getElementById("myCanvas").width / 2, 40);
		}
		
		this.ctx.closePath();
	}
}
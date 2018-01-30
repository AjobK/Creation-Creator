var notificationActive = false;

function qNot(inputtext) {
	if (!notificationActive) {
		console.log("Notification: " + inputtext);
		
		notificationActive = true;
		var notField = document.getElementById("Notification");
		
		notField.style.transition = "0.7s";
		notField.style.backgroundColor = "red";
		notField.style.opacity = "1";
		
		setTimeout(function(e) {
		notField.style.transition = "0.7s";
			notField.style.backgroundColor = "rgba(0,0,0,0.4)";
			notField.style.opacity = "0";
			setTimeout(function(e) {
				notField.innerHTML = "";
				notificationActive = false;
			}, 700);
		}, 3000);
		notField.innerHTML = inputtext;
	}
}

const src = require('./images/doug-icon.png');

export function requestNotificationPermission() {
	// if (window.Notification && window.Notification.requestPermission) {
	// 	window.Notification.requestPermission().then(function(result) {
	// 	  console.log(result);
	// 	});
	// }
}

export function showNotification(title, message) {
	if (window.Notification) {
		new Notification(title, {
		  body: message,
		  icon: src,
		});
	}
}
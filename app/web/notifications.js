import NotifyLib from 'notifyjs';
const Notify = NotifyLib.default;
const src = require('./images/doug-icon.png');

function onPermissionGranted() {
    console.log('Permission has been granted by the user');
}

function onPermissionDenied() {
    console.warn('Permission has been denied by the user');
}

export function requestNotificationPermission() {
	if (Notify.isSupported()) {
    	Notify.requestPermission(onPermissionGranted, onPermissionDenied);
	}
}

export function showNotification(title, message) {
	
	if (!Notify.needsPermission) {
    	const myNotification = new Notify(title, {
		  body: message,
		  icon: src,
		  timeout: 20000,
		  closeOnClick: true, 
		});

		myNotification.show();

	} else if (Notify.isSupported()) {
	    requestNotificationPermission(onPermissionGranted, onPermissionDenied);
	}
	
}
// Need to require instead of import so we can set the user agent first
// This must be below your `window.navigator` hack above
import io from 'socket.io-client/socket.io';

const socket = io('http://localhost:3000', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', () => console.log('connection established to dlg websocket server'));
socket.on('disconnect', () => console.log('connection lost to the dlg websocket server'));

export default socket;
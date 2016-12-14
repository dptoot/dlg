// Need to require instead of import so we can set the user agent first
// This must be below your `window.navigator` hack above
import io from 'socket.io-client/socket.io';
import config from '../engine/config';

const socket = io(config('WEBSOCKET_HOST'), {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', () => console.log('connection established to dlg websocket server'));
socket.on('disconnect', () => console.log('connection lost to the dlg websocket server'));
socket.on('error', () => console.log('there was an error connecting dlg websocket server'));

export default socket;
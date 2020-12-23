import {io} from 'socket.io-client';

const socket = io('https://socket.ozcandy.com.br');
socket.on(
  'connection',

  () => {}, // eslint-disable-line
  // console.log('[IO] Connect => A new connection has been established'),
);

export default socket;

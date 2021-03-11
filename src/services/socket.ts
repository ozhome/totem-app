import {io} from 'socket.io-client';

const socket = io('https://api-home.ozcandy.com.br');
socket.on(
  'connection',
  () => {
    //TODO
  },
  // console.log('[IO] Connect => A new connection has been established'),
);

export default socket;

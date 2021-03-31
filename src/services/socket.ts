import {io} from 'socket.io-client';
import {url} from './index';

const socket = io(url);
socket.on(
  'connection',
  () => {
    //TODO
  },
  // console.log('[IO] Connect => A new connection has been established'),
);

export default socket;

import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';

export let socket = io(URL) ; 

export function initializeSocket(){
    socket = io(URL);
}

export function disconnect(){
    socket.disconnect();
}
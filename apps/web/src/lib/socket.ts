'use client';
import { io, Socket } from 'socket.io-client';
let socket: Socket | null = null;
export function getSocket(): Socket {
  if (socket) return socket;
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001', { transports: ['websocket'], autoConnect: false });
  return socket;
}
export function connectSocket(token: string): Socket {
  const s = getSocket();
  if (!s.connected) { (s.io.opts.query as any) = { token }; s.connect(); }
  return s;
}

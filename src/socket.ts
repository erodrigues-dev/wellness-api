import { Server } from 'socket.io';
import http from 'http';

class MySocket {
  private io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      path: `/${process.env.SOCKET_KEY}`,
      cors: {
        origin: '*',
        preflightContinue: false,
        optionsSuccessStatus: 204
      }
    });
  }

  emit(ev: string, ...args: any[]) {
    this.io.emit(ev, ...args);
  }
}

class SocketInstance {
  private instance: MySocket;

  initialize(server: http.Server) {
    this.instance = new MySocket(server);
  }

  getInstance() {
    return this.instance;
  }
}

export default new SocketInstance();

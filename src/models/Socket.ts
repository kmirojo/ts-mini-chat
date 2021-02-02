import { Server as SocketServer, Socket as SocketIO } from "socket.io";

class Socket {
    private io: SocketServer;

    constructor(io: SocketServer) {
        this.io = io;
        this.socketEvents();
    }

    private socketEvents() {
        // On Connection
        this.io.on("connection", (socket: SocketIO) => {
            // Listen Events

            socket.on("message-to-server", (data) => {
                console.log(data);

                this.io.emit("message-from-server", data);
            });

            // Create Events

            socket.emit("welcome-message", {
                message: "Welcome to the server",
                date: new Date(),
            });
        });
    }
}

export default Socket;

import express, { Express } from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import path from "path";
import { IServer } from "../interfaces/Server";
import Socket from "./Socket";
import cors from "cors";

class Server implements IServer {
    private app: Express;
    private PORT: string;
    private server: http.Server;
    private io: SocketServer;

    constructor() {
        // Express Server ===============
        this.app = express();
        this.PORT = process.env.PORT || "3000";

        // Http Server ===============
        this.server = new http.Server(this.app);

        // Socket server configuration ===============
        this.io = new SocketServer(this.server, {
            /* Configurations */
        });
    }

    private middlewares() {
        // Deploy public directory ===============
        this.app.use(express.static(path.resolve(__dirname, "../public")));

        // Allow CORS ===============
        this.app.use(cors());
    }

    private socketsConfig() {
        new Socket(this.io);
    }

    public execute() {
        // Init Middlewarse
        this.middlewares();

        // Init Sockets
        this.socketsConfig();

        // Init Server
        this.server.listen(this.PORT, () => {
            console.log(`Server running on port => ${this.PORT}`);
        });
    }
}

export default Server;

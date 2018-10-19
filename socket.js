const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const {Writable} = require('stream');

class OutStream extends Writable {

    constructor(socket) {
        super();
        this.m_socket = socket;
    }

    _write(chunk, encoding, callback) {
        // send chunk to ws
        this.m_socket.send(chunk.toString());
        callback();
    }
}

const server = http.createServer();
const wsServer = new WebSocket.Server({server}); // const wss = new WebSocket.Server({ server: server });

/** En cas de requête on envoie la page index */
server.on("request", (request, response) => {
    const fileSrc = fs.createReadStream("./index.html");
    fileSrc.pipe(response);
});

server.listen(8080);

/** Connexion client */
wsServer.on("connection", client => {
    console.log("connection", client);

    /** Envoi d'un message au client */
    const message = {
        id: 12,
        content: "data from server"
    };
    const messageStr = JSON.stringify(message);
    client.send(messageStr);

    let out = new OutStream(client);
    process.stdin.pipe(out);

    /** Message reçu de la part du client */
    client.on("message", message => {
        console.log("message from client: ", message);
    });
});

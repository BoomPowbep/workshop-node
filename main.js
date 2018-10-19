const Twitter = require('twitter');
const dotEnv = require('dotenv');
const TwitterStream = require('./twitterStream');
const { tweetExtractor, stringify } = require('./transforms');

const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const {Writable} = require('stream');

dotEnv.config();


const server = http.createServer();
const wsServer = new WebSocket.Server({server}); // const wss = new WebSocket.Server({ server: server });

/** En cas de requête on envoie la page index */
server.on("request", (request, response) => {
    const fileSrc = fs.createReadStream("./index.html");
    fileSrc.pipe(response);
});

server.listen(8080);

const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const stream = new TwitterStream(twitterClient);


// stream.pipe(tweetExtractor).pipe(stringify).pipe(process.stdout);

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

/** Connexion client */
wsServer.on("connection", client => {
    console.log("connection", client);
    stream.track('fuck');
    let out = new OutStream(client);
    stream.pipe(tweetExtractor).pipe(stringify).pipe(out);
});

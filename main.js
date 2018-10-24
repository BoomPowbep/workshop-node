const Twitter = require('twitter');
const dotEnv = require('dotenv');
const { TwitterStream, OutStream } = require('./streams');
const { tweetExtractor, stringify } = require('./transforms');

const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");

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

/** Connexion client */
wsServer.on("connection", client => {

    let currentKeyword = 'melenchon';

    let out = new OutStream(client);

    client.on("message", message => {
        console.log("Switch request from client: ", message);
        stream.unpipe().unpipe().unpipe();
        run();
    });

    run();

    function run() {

        switch(currentKeyword) {
            case 'melenchon':
                currentKeyword = 'johnny';
                break;
            case 'johnny':
                currentKeyword = 'melenchon';
                break;
        }

        stream.track(currentKeyword);
        stream.pipe(tweetExtractor).pipe(stringify).pipe(out);
    }
});

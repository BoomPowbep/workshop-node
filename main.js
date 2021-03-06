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

/** Sending index.html to the client */
server.on("request", (request, response) => {
    const fileSrc = fs.createReadStream("./public/index.html");
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

/** On new client */
wsServer.on("connection", client => {

    let out = new OutStream(client);

    // Switch keyword request from client
    client.on("message", message => {
        console.log("New filter from client : ", message);
        stream.unpipe();
        run(message);
    });

    run('clinton'); // Starts with this keyword

    function run(keyword) {

        stream.track(keyword);
        stream.pipe(tweetExtractor).pipe(stringify).pipe(out);
    }
});

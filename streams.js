const { Readable, Writable } = require('stream');

class Streams extends Readable {

    constructor(twitterClient) {
        super({objectMode: true});
        this.client = twitterClient;
    }

    _read() {}

    track(query) {
        this.stream = this.client.stream('statuses/filter', {track: query});
        this.stream.on('data', tweet => this.push(tweet));
        this.stream.on('error', err => console.error(err));
    }
}

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

module.exports = {
    TwitterStream: Streams,
    OutStream
};

const { Readable, Writable } = require('stream');

/**
 * Read Stream
 */
class Streams extends Readable {

    /**
     * Constructor.
     * @param twitterClient
     */
    constructor(twitterClient) {
        super({objectMode: true});
        this.client = twitterClient;
    }

    /**
     * Read rewrite.
     * @private
     */
    _read() {}

    /**
     * Watches for new tweets.
     * @param query
     */
    track(query) {
        this.stream = this.client.stream('statuses/filter', {track: query});
        this.stream.on('data', tweet => this.push(tweet));
        this.stream.on('error', err => console.error(err));
    }
}

/**
 * Write Stream
 */
class OutStream extends Writable {

    /**
     * Constructor.
     * @param socket
     */
    constructor(socket) {
        super();
        this.m_socket = socket;
    }

    /**
     * Sends data to the client via a socket connection.
     * @param chunk
     * @param encoding
     * @param callback
     * @private
     */
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

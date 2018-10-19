const {Transform} = require('stream');

const tweetExtractor = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        const newChunk = chunk.text;
        this.push(newChunk);
        callback();
    }
});

const stringify = new Transform({

    writableObjectMode: true,

    transform(chunk, encoding, callback) {
        const newChunk = JSON.stringify(chunk) + '\n';
        this.push(newChunk);
        callback();
    }
});

module.exports = {
    tweetExtractor,
    stringify
};

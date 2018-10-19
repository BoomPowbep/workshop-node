const {Transform} = require('stream');

const tweetExtractor = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    transform(chunk, encoding, callback) {

        let enabled = chunk.user.geo_enabled;

        if (enabled === true) {

            let name = chunk.user.name;
            let pic = chunk.user.profile_image_url_https;
            console.log(name);
            this.push({name, pic});
        }
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

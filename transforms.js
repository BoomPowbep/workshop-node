const {Transform} = require('stream');

/**
 * Tweet Extractor Singleton.
 * Extracts data from a tweet.
 */
const tweetExtractor = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,

    /**
     * Filters the twitter API data.
     * Extracts 'geo enabled', 'user name' and 'profile image'
     * @param chunk
     * @param encoding
     * @param callback
     */
    transform(chunk, encoding, callback) {

        let enabled = chunk.user.geo_enabled;

        // Getting more info if the user enabled geoloc
        if (enabled === true) {

            let name = chunk.user.name;
            let pic = chunk.user.profile_image_url_https;
            console.log(name);
            this.push({name, pic});
        }
        callback();
    }
});

/**
 * Stringify Singleton.
 * Stringifies our data for sour stream.
 */
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

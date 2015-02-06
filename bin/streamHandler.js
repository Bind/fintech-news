var Article = require('../models/article');

module.exports = function(stream, io) {

    // When tweets get sent our way ...
    stream.on('data', function(data) {

        // Construct a new tweet object
        var article = {
            id: data['id'],
            active: false,
            author: data['author']['name'],
            avatar: data['author']['thumbnail']['url'],
            body: data['content'],
            date: data['published'],
        };

        // Create a new model instance with our object
        var articleEntry = new Article(article);

        // Save 'er to the database
        articleEntry.save(function(err) {
            if (!err) {
                // If everything is cool, socket.io emits the tweet.
                io.emit('tweet', tweet);
            }
        });

    });

};
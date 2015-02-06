var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    twid: String,
    active: Boolean,
    author: String,
    avatar: String,
    body: String,
    date: Date,
    screenname: String
});

// Create a static getTweets method to return tweet data from the db
schema.statics.getArticles = function(page, skip, callback) {

    var articles = [],
        start = (page * 10) + (skip * 1);

    // Query the db, using skip and limit to achieve page chunks
    Article.find({}, 'id active author avatar body date screenname', {
        skip: start,
        limit: 10
    }).sort({
        date: 'desc'
    }).exec(function(err, docs) {

        // If everything is cool...
        if (!err) {
            articles = docs; // We got tweets
            articles.forEach(function(article) {
                article.active = true; // Set them to active
            });
        }

        // Pass them back to the specified callback
        callback(articles);

    });

};

// Return a Tweet model based upon the defined schema
module.exports = Article = mongoose.model('Article', schema);
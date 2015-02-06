var express = require('express');
var router = express.Router();
var JSX = require('node-jsx').install()
var newsApp = require('../public/javascripts/components/newsApp.jsx')
var Article = require('../models/article.js')

require("node-jsx").install({
    harmony: true,
    extension: ".jsx"
});

var React = require("react")

/* GET home page. */
router.get('/', function(req, res) {
    Article.getArticles(0, 0, function(articles, pages) {

        var markup = React.renderToString(newsApp({
            articles: articles
        }))

        res.render('index', {
            title: 'Express',
            markup: markup
        });
    });
})

module.exports = router;
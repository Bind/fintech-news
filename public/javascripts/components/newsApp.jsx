/**
 * @jsx React.DOM
 */

var React = require("react"),
Articles = require("./articles.jsx"),
Article = require("./article.jsx")
Loader = require("./loader.jsx")
NotificationBar = require("./notificationBar.jsx")
module.exports = newsApp = React.createClass({

    getInitialState: function(props){

        props = props || this.props
        return {
            articles: props.articles,
            count:0,
            page:0,
            paging: false,
            skip:0,
            done: false
        };


    },
    componentWillRecieveProps: function(newProps, oldProps){
        this.setState(this.getInitialState(newProps))
    },

        
    render: function(){

        return(
            <div className="news-app">
            <Articles articles={this.state.articles} />
            <Loader paging={this.state.paging}/>
            <NotificationBar count={this.state.count} onShowNewArticles={this.ShowNewArticles}/>
          </div>)
    },

    componentDidMount: function(){
        var self = this
        var socket = io.connect()

        socket.on('article', function(dat){
            self.addArticle(data)
        })
        window.addEventListener('scroll', this.checkWindowScroll);
    },

    addArticle: function(article){
        var updated = this.state.article;
        var count = this.state.count + 1
        var skip = this.state.skip +=

        updated.unshift(article);

        this.setState({articles: updated, count: count, skip: skip})

    },
    ShowNewArticles: function(){
        var update = this.state.articles;

        updated.forEach(function(article){
            article.active = true;
        })
        this.setState({articles: updated, count:0})
    },
    checkWindowScroll: function(){

            // Get scroll pos & window data
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var s = document.body.scrollTop;
    var scrolled = (h + s) > document.body.offsetHeight;

    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !this.state.paging && !this.state.done) {

      // Set application state (Paging, Increment page)
      this.setState({paging: true, page: this.state.page + 1});

      // Get the next page of tweets from the server
      this.getPage(this.state.page);

    }
    },

    // Method to get JSON from server by page
  getPage: function(page){

    // Setup our ajax request
    var request = new XMLHttpRequest(), self = this;
    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = function() {

      // If everything is cool...
      if (request.status >= 200 && request.status < 400){

        // Load our next page
        self.loadPagedArticles(JSON.parse(request.responseText));

      } else {

        // Set application state (Not paging, paging complete)
        self.setState({paging: false, done: true});

      }
    };

    // Fire!
    request.send();

  },
  loadPagedArticles: function(articles){
    var self = this;
    if(articles.length > 0 ){
        var update = this.state.articles;

        articles.forEach(function(article){
            updated.push(article);
        })

        setTimeout(function(){

            self.setState({articles: updated, paging: false})
        }, 1000)
        this.setState({done: true, paging: false})

    }
  },

})
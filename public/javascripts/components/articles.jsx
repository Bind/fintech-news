var React = require("react");
var Article = require('./article.jsx')

module.exports = Articles = React.createClass({
render: function(){
  var content = this.props.articles.map(function(article){

    return(
      <Article key={article.id} article={article}/>
      )
    })
  return (
    <ul className="news">{content}</ul>
    )
}


})
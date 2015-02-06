/** @jsx React.DOM */

var React = require('react');

module.exports = Article = React.createClass({
  render: function(){
    var article = this.props.article;
    return (
      <li className={"article" + (article.active ? ' active' : '')}>
      <p>{article.title}</p>
      }
      </li>
    )
  }
});
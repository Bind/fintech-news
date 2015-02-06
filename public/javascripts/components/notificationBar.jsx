var React = require('react')

module.exports = NotificationBar = React.createClass({
    render: function(){
        var count = this.props.count;
        return(
<div className={"notification-bar" + (count > 0 ? ' active': "")}>
        <p>There are {count} new articles! <a href="#top" onClick={this.props.onShowNewArticles}>Click here to see them.</a></p>
      </div>
            )

    }

})
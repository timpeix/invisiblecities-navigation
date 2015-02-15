var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


var Content = React.createClass({  
  render: function() {
    
      return (
        <div>

          <Menu list={menuItems} title={appTitle} onContentChange={this.contentChange}/>
          <RouteHandler/>

        </div>
      );
  }
})

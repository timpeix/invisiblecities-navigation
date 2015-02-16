var React = require('react');
var Menu = require('./Menu.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var strings = require('./strings')

// TODO put in json, use in MENU
var menuItems = [
  'Vorwort',
  'Interaktive Projekte',
  'Animation',
  'Nachwort'
];


var Content = React.createClass({  
  render: function() {
      return (
        <div>
          <Menu list={menuItems} title={strings.App.title} />
          <RouteHandler/>
        </div>
      );
  }
})


module.exports = Content

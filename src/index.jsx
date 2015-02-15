var React = require('react');
var Swipeable = require('react-swipeable');
var Router = require('react-router');
var Cover = require('./Cover.jsx');
var Menu = require('./Menu.jsx');
var Content = require('./Content.jsx');
var Projects = require('./Projects.jsx');

var menuItems = [
  'Vorwort',
  'Interaktive Projekte',
  'Animation',
  'Nachwort'
];




var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});


var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="cover" handler={Cover} />
    <Route name="content" handler={Content}>
      <Route name="projects" handler={Projects} />
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

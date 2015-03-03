var React = require('react');
var Swipeable = require('react-swipeable');
var Router = require('react-router');
var Cover = require('./Cover.jsx');
var Menu = require('./Menu.jsx');
var Content = require('./Content.jsx');
var Projects = require('./Projects.jsx');
var Preface = require('./Preface.jsx');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
    mixins: [ Router.State ],

  render: function () {
    return (
      <TransitionGroup component="div" transitionName="horizontal">
          <RouteHandler key={this.getTopHandlerKey()} />
      </TransitionGroup>
    );
  },
  getTopHandlerKey: function () {
    var childDepth = 1;
    var childName = this.getRoutes()[childDepth].name;
    console.log(childName);
    return childName;
  },
});


var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="cover" handler={Cover}/>
    <Route name="content" handler={Content}>
      <Route name="projects" handler={Projects}/>
      <Route name="preface" handler={Preface}/>
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

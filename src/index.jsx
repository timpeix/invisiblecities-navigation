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
        var name = this.getRoutes().reverse()[0].name;

    return (
      <TransitionGroup component="div" transitionName="horizontal">
          <RouteHandler key={name}/>
      </TransitionGroup>
    );
  }
});


var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="cover" handler={Cover} addHandlerKey={true} />
    <Route name="content" handler={Content}>
      <Route name="projects" handler={Projects} addHandlerKey={true} />
      <Route name="preface" handler={Preface} addHandlerKey={true} />
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

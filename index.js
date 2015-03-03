(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var React = require("react");
var Swipeable = require("react-swipeable");
var Router = require("react-router");
var Cover = require("./Cover.jsx");
var Menu = require("./Menu.jsx");
var Content = require("./Content.jsx");
var Projects = require("./Projects.jsx");
var Preface = require("./Preface.jsx");
var TransitionGroup = require("react/lib/ReactCSSTransitionGroup");

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  displayName: "App",
  mixins: [Router.State],

  render: function () {
    return React.createElement(
      TransitionGroup,
      { component: "div", transitionName: "horizontal" },
      React.createElement(RouteHandler, { key: this.getTopHandlerKey() })
    );
  },
  getTopHandlerKey: function () {
    var childDepth = 1;
    var childName = this.getRoutes()[childDepth].name;
    console.log(childName);
    return childName;
  } });


var routes = React.createElement(
  Route,
  { handler: App, path: "/" },
  React.createElement(DefaultRoute, { name: "cover", handler: Cover }),
  React.createElement(
    Route,
    { name: "content", handler: Content },
    React.createElement(Route, { name: "projects", handler: Projects }),
    React.createElement(Route, { name: "preface", handler: Preface })
  )
);

Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
});

},{"./Content.jsx":204,"./Cover.jsx":205,"./Menu.jsx":207,"./Preface.jsx":208,"./Projects.jsx":209,"react":203,"react-router":26,"react-swipeable":40,"react/lib/ReactCSSTransitionGroup":75}]
var React = require('react');
var Text = require('./Text.jsx');
var GridView = require('./GridView.jsx');

var fillText = 'Vergeblich, großherziger Kublai, werde ich versuchen, dir die Stadt Zaira mit ihren hohen Bastionen zu beschreiben. Ich könnte dir sagen, wie viele Stufen die treppenförmigen Straßen haben, welche Wölbung die Bögen der Arkaden, mit was für';

var projects = [

  {
    author: 'Dom Okah',
    city: 'Perinthia',
    text: fillText,
    image: './IMG_0012.PNG',
    landscape: true,
    path: 'dom'
  },
  {
    author: 'Lorenz',
    city: 'Unknown',
    text: fillText,
    image: './IMG_0013.PNG',
    landscape: false,
    path: 'lorenz',
    specialRotate: true
  },
  {
    author: 'Wiebke Helmchen',
    city: 'Chloe',
    text: fillText,
    image: './IMG_0011.PNG',
    landscape: true,
    path: 'wiebke'
  },
  {
    author: 'Ilya Barret',
    city: 'Perinthia',
    text: fillText,
    image: './IMG_0016.PNG',
    landscape: false,
    path: 'ilya'
  },
  {
    author: 'Eric Reh',
    city: 'Perinthia',
    text: fillText,
    image: './eric.png',
    landscape: true,
    specialRotate: true,
    path: 'eric'
  },
  {
    author: 'Eric Zeh',
    city: 'Perinthia',
    text: fillText,
    image: './eric.png',
    landscape: true,
    specialRotate: true,
    path: 'eric'
  },
  {
    author: 'Eric Meh',
    city: 'Perinthia',
    text: fillText,
    image: './eric.png',
    landscape: true,
    specialRotate: true,
    path: 'eric'
  }
];

var Projects = React.createClass({
  getInitialState: function() {
    return {
      page: this.props.page
    };
  },
  render: function() {

        return <GridView projects={projects} ref="gridView"/>
  },
  changeTo: function(i) {
    this.setState({
      page: i
    })
  }
});

module.exports = Projects;

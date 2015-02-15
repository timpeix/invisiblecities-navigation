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
    landscape: true
  },
  
  {
    author: 'Lorenz',
    city: 'Unknown',
    text: fillText,
    image: './IMG_0013.PNG',
    landscape: false
  },
  {
    author: 'Wiebke Helmchen',
    city: 'Chloe',
    text: fillText,
    image: './IMG_0011.PNG',
    landscape: true
  },
  {
    author: 'Ilya Barret',
    city: 'Perinthia',
    text: fillText,
    image: './IMG_0016.PNG',
    landscape: false
  },
];

var Cover = React.createClass({
  getInitialState: function() {
    return {
      page: this.props.page
    };
  },
  render: function() {
    switch(this.state.page) {
      case 0:
        return <Text />

        
      case 1: 
        return <GridView projects={projects} ref="gridView"/>
    }
  },
  changeTo: function(i) {
    this.setState({
      page: i
    })
  }
});

module.exports = Cover;

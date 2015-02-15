var React = require('react');
var Swipeable = require('react-swipeable');

var Cover = require('./Cover.jsx');
var Menu = require('./Menu.jsx');
var Content = require('./Content.jsx');

var menuItems = [
  'Vorwort',
  'Interaktive Projekte',
  'Animation',
  'Nachwort'
];



var appTitle = "Die Unsichtbaren Städte"

var App = React.createClass({
  getInitialState: function() {
    return {
      coverVisible: true
    };
  },
  
  render: function() {
    
      return (
        <div>
           <Swipeable className="fullscreenPage" onSwiped={this.handleSwipe} ref="cover">
            <Cover title={appTitle} subtitle="Zeichnungen + Interaktionen" onClick={this.advance}/>
          </Swipeable>
          <Swipeable className="fullscreenPage" onSwiped={this.handleSwipe}>
              <Menu list={menuItems} title={appTitle} onContentChange={this.contentChange}/>
              <Content pages={menuItems} page={1} ref="content" />
          </Swipeable>
        </div>
      );

    

  },
  handleSwipe: function (e, x, y, flick) {
    console.log(e, x, y, flick);
    if (flick && y > 0 && Math.abs(y) > Math.abs(x)) {
      document.body.className='page1';

      e.preventDefault();
      e.stopPropagation();
    }
    if (flick && y < 0 && Math.abs(y) > Math.abs(x)) {
      console.log(this.refs.gridView.getDOMNode().scrollTop)
      document.body.className='page0';
      e.preventDefault();
      e.stopPropagation();
    }
  },
  advance: function() {
    document.body.className='page1';
  },
  onContentChange: function(i) {
    this.refs.content.changeTo(i);
  }
})

React.render(
  <App/>,
  document.body
)

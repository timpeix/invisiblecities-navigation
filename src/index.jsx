var React = require('react');
var Swipeable = require('react-swipeable');

var Cover = require('./Cover.jsx');
var Menu = require('./Menu.jsx');
var Fill = require('./Fill.jsx');

var menuItems = [
  'Vorwort',
  'Animation',
  'Nachwort'
]


var App = React.createClass({

  render: function() {
    return (
      <div>
         <Swipeable className="fullscreenPage" onSwiped={this.handleSwipe}>
          <Cover title="Die Unsichtbaren Städte" subtitle="Zeichnungen + Interaktionen"/>
        </Swipeable>
        <Swipeable className="fullscreenPage" onSwiped={this.handleSwipe}>
            <Menu list={menuItems}/>
            <Fill/>
        </Swipeable>

      </div>
    );
  },
  handleSwipe: function (e, x, y, flick) {
    console.log(e, x, y, flick);
    if (flick && y > 0 && Math.abs(y) > Math.abs(x)) {
      document.body.className='page1';
    }
    if (flick && y < 0 && Math.abs(y) > Math.abs(x)) {
      document.body.className='page0';
    }
  }
})

React.render(
  <App/>,
  document.body
)

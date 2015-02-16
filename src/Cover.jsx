var React = require('react');
var strings = require('./strings')
var Swipeable = require('react-swipeable');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var Cover = React.createClass({

  mixins: [Navigation],
  render: function() {
    return (
     <Swipeable className="fullscreenPage" onSwiped={this.go} ref="cover">
       
            <div className='cover' onClick={this.go}>
              <Link to="projects"><h1>{strings.App.title}</h1></Link>
              <h2>{strings.App.subtitle}</h2>
            </div>
      
    </Swipeable>


    );
  },
  go:  function (e, x, y, flick) {
    
    if (e.type == 'click' || (flick && y > 0 && Math.abs(y) > Math.abs(x))) {
      this.transitionTo('projects');
    }
  

  }
});

module.exports = Cover;

var React = require('react');
var strings = require('./strings')
var Swipeable = require('react-swipeable');
var Link = require('react-router').Link;

var Cover = React.createClass({

  render: function() {
    return (
     <Swipeable className="fullscreenPage" onSwiped={this.go} ref="cover">
       <Link to="content">
            <div className='cover' onClick={this.go}>
              <h1>{strings.App.title}</h1>
              <h2>{strings.App.subtitle}</h2>
            </div>
      </Link>
    </Swipeable>


    );
  },
  go:  function (e, x, y, flick) {
        // console.log(e, x, y, flick);
        // if (flick && y > 0 && Math.abs(y) > Math.abs(x)) {
        //   document.body.className='page1';
        // 
        //   e.preventDefault();
        //   e.stopPropagation();
        // }
        // if (flick && y < 0 && Math.abs(y) > Math.abs(x)) {
        //   console.log(this.refs.gridView.getDOMNode().scrollTop)
        //   document.body.className='page0';
        //   e.preventDefault();
        //   e.stopPropagation();
        // }
  

  }
});

module.exports = Cover;

var React = require('react');
var prefixer = require('react-prefixr');
var classnames = require('classnames');

var heights = {
  medium:  ~~(window.innerHeight * 0.22),
  large: ~~(window.innerHeight * 0.6)
}

var CardItem = React.createClass({
  getInitialState: function() {
    return {
      focus: false
    };
  },
  render: function() {
    var classes = classnames({
      'cardItem': true,
      'focus': this.state.focus,
      'beforeFocus': this.state.before,
      'afterFocus': this.state.after,
    });
    var divStyle = {
      zIndex: this.state.zIndex
    };
    return (
      <div className={classes} style={divStyle}>
        <img src={this.props.image} onClick={this.goToProject}/>
        <div className='block'>
          <div className='author' onClick={this.goToProject}>{this.props.author}</div>
          <div className='cardText'>{this.props.text}</div>
        </div>
      </div>
    )
  },
  goToProject: function(e) {
    // Only allow click on image when expanded
    if (e.target.tagName == 'IMG' && !this.state.focus) {
      console.log('skipping');
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    var p = this.props;
    window.location.href = `thepony://o/${p.path}?landscape=${p.landscape}&specialRotate=${p.specialRotate}`;
  },
});


var CardView = React.createClass({
  getInitialState: function() {
    return {
      focus: false,
      transitioning: false,
      focusItem: 0,
      fakeScroll: 0
    };
  },
  render: function() {
    var classes = classnames({
      'cardView': true,
      'focus': this.state.focus,
      'transitioning-in': (this.state.transitioning == 'in'),
      'transitioning-out': (this.state.transitioning == 'out')
    });
    var cardNodes = this.props.projects.map(function(project, i) {
      return (
        <CardItem ref={i} key={project.author} parent={this} {...project} />
      );
    }, this);
    
    var numClass = 'cardViewWrapper childnum' + cardNodes.length;
    var style = prefixer({'transform': `translate(0, ${-this.state.fakeScroll}px)`});
    
    this.cardItems = cardNodes;
    
    return (<div className={classes} onClick={this.focus}>
        <div className={numClass} style={style}>
          {cardNodes}
        </div>
      </div>
    );
  },
  getCorrectTarget: function (x, y) {
    if (this.state.transitioning) {
      console.log("cant handle clicks while animating");
      setTimeout(() => {
        this.setTransitioning(false);
      }, 750);
      return false;
    }
    
    var target = 0;
    var scrollPos = this.getDOMNode().scrollTop;
    var targetY = scrollPos + y;
    

    
    console.log('current focus', this.state.focusItem);
    
    if (this.state.focus) {
      var curY = 0;
      var i = -1;
      while(curY <= targetY) {
        i++;
        curY += (this.state.focusItem == i) ? heights.large : heights.medium;
      }
      target = i;
    } else {
      target = Math.floor(targetY / heights.medium)
    }
    
    console.log('tapped number', target);
    return target;
  },
  
  focus: function(e) {
    var target = this.getCorrectTarget(e.clientX, e.clientY);
    
    if (this.state.focus && target == this.state.focusItem) {
      this.removeAllFocus();
    } else {
      this.removeAllFocus(true, target);
    }
  },
  
  removeAllFocus: function(refocus = false, newItem) {
    console.log('refocus:', refocus, 'newly focussed:', newItem);
    var found = false;
    var last = this.state.focusItem;
    var at = 0;
    
    // Loop through all children
    for (var i in this.refs) {
      var focusThis = (newItem === parseInt(i));
      
      this.refs[i].setState({
        before: (!found && !focusThis && refocus),
        after: (found && refocus),
        focus: focusThis
      });
            
      if (focusThis) {
        found = true;
        at = parseInt(i);
      };
    }
    
    // Scroll to correct position:
    var item = (refocus) ? at : last;
    var node = this.getDOMNode();
    var scrollTop = node.scrollTop;
    var itemLength = Object.keys(this.refs).length;
    var contentHeight = (refocus) ? (itemLength - 1) * heights.medium + heights.large : itemLength * heights.medium;
    console.log('calculated height:', contentHeight, node.scrollHeight);
    var maxScroll = contentHeight - node.clientHeight;
    console.log('max', maxScroll);
    var margin = (refocus) ? window.innerHeight - heights.large : window.innerHeight - heights.medium;
    var optimalPosition = margin / 2;
    var currentPosition = item * heights.medium - scrollTop;
    var newScrollTop = Math.min(maxScroll, Math.max(0, scrollTop + currentPosition - optimalPosition));
    var diff = newScrollTop - scrollTop;
    
    this.setState({
      focus: refocus,
      focusItem: at,
      fakeScroll: diff,
      transitioning: (refocus) ? 'in' : 'out'
    })
  },
  
  resetScroll: function () {
    var node = this.getDOMNode();
    node.scrollTop += this.state.fakeScroll;
    this.setState({
      fakeScroll: 0,
      transitioning: false
    });
  },
  setTransitioning: function (bool) {
    this.setState({
      transitioning: bool
    })
  },
  onTransitionEnd: function () {
    console.log('reset scroll');
    this.resetScroll();
  },
  componentDidUpdate: function() {
    this.getDOMNode().addEventListener('transitionend', this.onTransitionEnd, false);
  },
  componentDidMount: function () {
    this.getDOMNode().addEventListener('scroll',  (e) => {
      console.log(e);
      console.log('scrolltop', this.getDOMNode().scrollTop);
    }, false);
  }
})

module.exports = CardView;

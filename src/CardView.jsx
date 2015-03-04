var React = require('react');
var React = require('react/addons');


var MenuList = React.createClass({
  render: function() {
    var listNodes = this.props.list.map(function(item) {
      return (
        <li>{item}</li>
      );
    })
    
    return (
      <ul>
        {listNodes}
      </ul>
    );
  }
});

var CardItem = React.createClass({
  getInitialState: function() {
    return {
      focus: false
    };
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'cardItem': true,
      'focus': this.state.focus,
      'beforeFocus': this.state.before,
      'afterFocus': this.state.after,
    });
    var divStyle = {
      zIndex: this.state.zIndex
    };
    return (
      <div className={classes} style={divStyle} onClick={this.focus}>
        <img src={this.props.image}/>
        <div className='block'>
          <div className='author' onClick={this.goToProject}>{this.props.author}</div>
          <div className='cardText'>{this.props.text}</div>
        </div>
      </div>
    )
  },
  goToProject: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var p = this.props;
    window.location.href = `thepony://o/${p.path}?landscape=${p.landscape}&specialRotate=${p.specialRotate}`;
  },
  focus: function(e) {
    console.log(87, this.props.author, e);
    if (!this.state.focus) {
      this.props.parent.removeAllFocus(this);
    } else {
      this.props.parent.removeAllFocus();
    }
    this.props.parent.setTransitioning(true);
  }
});


var CardView = React.createClass({
  getInitialState: function() {
    return {
      focus: false,
      transitioning: false
    };
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'cardView': true,
      'focus': this.state.focus,
      'transitioning': this.state.transitioning
    });
    var cardNodes = this.props.projects.map(function(project, i) {
      return (
        <CardItem ref={i} key={project.author} parent={this} {...project} />
      );
    }, this);
    
    var numClass = 'cardViewWrapper childnum' + cardNodes.length;
    
    this.cardItems = cardNodes;
    
    return (<div className={classes}>
        <div className={numClass}>
          {cardNodes}
        </div>
      </div>
    );
  },
  removeAllFocus: function(except) {
    var found = false;
    var at = i;
    for (var i in this.refs) {
      var isExcept = (except == this.refs[i]);
      this.refs[i].setState({
        before: (!found && !isExcept && except),
        after: (found && except),
        focus: isExcept
      });
      if (isExcept) {
        found = true;
        at = i;
      };
    }
    this.setState({
      focus: !!(except)
    })
    //this.getDOMNode().scrollTop = 0;
  },
  setTransitioning: function (bool) {
    this.setState({
      transitioning: bool
    })
  },
  onTransitionEnd: function () {
    this.setTransitioning(false);
  },
  componentDidUpdate: function() {
    this.getDOMNode().addEventListener('transitionend', this.onTransitionEnd, false);
  }
})

module.exports = CardView;

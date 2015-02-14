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

var GridItem = React.createClass({
  getInitialState: function() {
    return {
      focus: false
    };
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'gridItem': true,
      'landscape': this.props.landscape,
      'focus': this.state.focus
    });
    return (
      <div className={classes} >
        <div className='author'>{this.props.author}</div>
        <img src={this.props.image}/>
        <div className='gridText'>{this.props.text}</div>
      </div>
    )
  },
  focus: function() {
    if (!this.state.focus) {
      this.props.parent.removeAllFocus(this);
    } else {
      this.props.parent.removeAllFocus();
    }
  }
});


var GridView = React.createClass({
  getInitialState: function() {
    return {
      focus: false
    };
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'gridView': true,
      'focus': this.state.focus
    });
    var gridNodes = this.props.projects.map(function(project, i) {
      return (
        <GridItem ref={i} key={project.author} parent={this} {...project} />
      );
    }, this);
    
    this.gridItems = gridNodes;
    
    return (<div className={classes}>
      {gridNodes}
      </div>
    );
  },
  removeAllFocus: function(except) {
    for (var i in this.refs) {
      this.refs[i].setState({
        focus: (except == this.refs[i])
      });
    }
    this.setState({
      focus: !!(except)
    })
  
  }
})

module.exports = GridView;

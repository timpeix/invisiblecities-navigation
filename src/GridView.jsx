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
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'gridItem': true,
      'landscape': this.props.landscape
    });
    return (
      <div className={classes}>
        <div className='author'>{this.props.author}</div>
        <img src={this.props.image}/>
        <div>{this.props.text}</div>
      </div>
    )
  }
});


var GridView = React.createClass({

  render: function() {
    var gridNodes = this.props.projects.map(function(project, i) {
      return (
        <GridItem key={project.author} {...project} />
      );
    })
    
    return (<div className="gridView">
      {gridNodes}
      </div>
    );
  }
})

module.exports = GridView;

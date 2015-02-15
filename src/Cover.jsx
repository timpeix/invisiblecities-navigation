var React = require('react');


var Cover = React.createClass({

  render: function() {
    return (
      <div className='cover' onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
});

module.exports = Cover;

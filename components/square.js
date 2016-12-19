import React from 'react';
var Square = React.createClass({
    render: function(){
      return(
        <div>
          <div className={this.props.class} id={this.props.id} onClick={this.props.onClick}/>
        </div>
      )
    }
})

export default Square;

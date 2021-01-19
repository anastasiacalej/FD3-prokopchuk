import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component {

  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired
  };

  pressed1=()=>{
    this.props.cbPressed(1);
  }

  pressed2=()=>{
    this.props.cbPressed(2);
  }

  render() {
   
    return (
      <div>
          <input type='button' value={this.props.caption1} onClick={this.pressed1} style={{marginRight:'10px'}}/>
          {this.props.children}
          <input type='button' value={this.props.caption2} onClick={this.pressed2} style={{marginLeft:'10px'}}/>
      </div>
      
    ); 
  }
}

export default DoubleButton;

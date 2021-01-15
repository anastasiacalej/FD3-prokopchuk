import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
   
    return (
      <div style={{width:"40%",margin:"0 auto",fontWeight:"bold", fontSize:"30px", textAlign:"center",lineHeight:"250%"}}>
          {
            this.props.colors.reduce((r,v)=>
            {
               return (
                 <div style={{border:"solid 10px "+v,padding:"10px"}}>
                   {r}
                 </div>
               );
            },
              this.props.children
            )
          }
      </div>
    ); 
  }
}

export default RainbowFrame;

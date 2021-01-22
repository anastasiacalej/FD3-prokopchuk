import React from 'react';
import PropTypes from 'prop-types';

class Br2jsx extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
 
    return (
      
      <div style={{width:"150px",padding:"20px", backgroundColor:"#13594c", fontWeight:"bold", 
           fontSize:"24px", color:"white", textAlign:"center"}}>
          {
           this.props.text.split(/<br\s?\/?>/g).reduce((r,v,i,a)=>{
              r.push(v);
              (i<a.length-1)&&r.push(<br key={i}/>);
           return r;
           },[])
          }
      </div>
    
    ); 
  }
}

export default Br2jsx;
import React from 'react';

    let withRainbowFrame = (colors)=>Component=>props=>
      //первый вариант через forEach: 
      //  {
      //     let code=<Component {...props}/>;           
      //     colors.forEach(color =>           
      //       code=<div style={{border:"solid 5px "+color,padding:"10px"}}>{code}</div>
      //     );
      //     return (
      //       <div style={{width:"600px",textAlign:"center"}}>
      //         {code}
      //       </div>
      //     )
      //  }
      
            //-----------------------------
            //второй вариант через reduce:
        <div style={{width:"600px",textAlign:"center"}}>
           { colors.reduce((r,color)=>
            {
               return (
                 <div style={{border:"solid 10px "+color,padding:"10px"}}>
                   {r}
                 </div>
               );
            },
              <Component {...props}/>
            )}
        </div>

export {withRainbowFrame};

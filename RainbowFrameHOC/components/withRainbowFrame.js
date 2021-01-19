import React from 'react';

    let withRainbowFrame = (colors,code)=>Component=>props=> 
      (<div style={{width:"600px",textAlign:"center"}}>

          { 
            //первый вариант через forEach:

            code=<Component {...props}/>,           
            colors.forEach(color =>           
              code=<div style={{border:"solid 5px "+color,padding:"10px"}}>{code}</div>
            ),
            code

            //-----------------------------
            //второй вариант через reduce:

            // colors.reduce((r,v)=>
            // {
            //    return (
            //      <div style={{border:"solid 10px "+v,padding:"10px"}}>
            //        {r}
            //      </div>
            //    );
            // },
            //   <Component {...props}/>
            // )

          }
      </div>
      ); 


export {withRainbowFrame};

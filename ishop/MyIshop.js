var MyIshop = React.createClass({

    displayName: 'MyIshop',
    
    render: function() {
      var head=this.props.head;
      var headCode=        
          React.DOM.tr({className:'HeadProduct'},           
            React.DOM.td({className:'View'}),
            React.DOM.td({className:'Name'},head.name),
            React.DOM.td({className:'Code'},head.code),            
            React.DOM.td({className:'Price'},head.price),
            React.DOM.td({className:'Count'},head.count),
            React.DOM.td({className:'Expected'},head.expected),  
          );
      
      var listsCode=[];
     
      this.props.list.forEach((v,i,a)=>{        
        var listCode=        
          React.DOM.tr({key:v.code,className:'Product'},           
            React.DOM.td({className:'View'},
                          React.DOM.img({className:'ViewImg',src:v.view}),),
            React.DOM.td({className:'Name'},v.name),
            React.DOM.td({className:'Code'},'код '+v.code),              
            React.DOM.td({className:'Price'},v.price),
            React.DOM.td({className:'Count'},v.count),
            React.DOM.td({className:'Expected'},v.expected),  
          );
        listsCode.push(listCode);
      });

      return React.DOM.div( {className:'MyIshop'}, 
        React.DOM.h1( {className:'NameShop'}, this.props.name ),
        React.DOM.table( {className:'Products'},
                          React.DOM.tbody({},headCode,listsCode)),
      );
    },
  
  });
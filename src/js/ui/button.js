import React from 'react';

class Button extends React.Component {
    constructor(props){
      super(props);
      
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(evt){
      this.props.handleClick(evt);
    }
    
    render(){
      return(
        <div id="TODO_BUTTON_ADD_ID" className="DELETE_BUTTON" onClick={this.handleClick}>
          {this.props.icon}
        </div>
      );
    }
  }

  export default Button;
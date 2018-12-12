import React from 'react';


class DatabaseCollection  extends React.Component {
    constructor(props){
        super(props);
    }

    

    render(){
        return (
            <div className='COLLAPSIBLE_LIST_ITEM'>
               <h1 id={this.props.name} onClick={this.props.handleClick}>{this.props.name}</h1>  
            </div>
        );
    };


}

export default DatabaseCollection;
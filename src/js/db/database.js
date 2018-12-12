import React from 'react';


class Database extends React.Component {
    constructor(props){
        super(props);
    }

    

    render(){
        return (
            <div className="COLLAPSIBLE_LIST_ITEM">
               <h1 id={this.props.name} onClick={this.props.handleClick}>{this.props.name}</h1>  
            </div>
        );
    };


}

export default Database;
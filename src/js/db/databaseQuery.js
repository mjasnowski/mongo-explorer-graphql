import React from 'react';

class DatabaseQuery extends React.Component {
    constructor(props){
        super(props);

        //this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return (
            <div className='APPLICATION_CONTENT_WIDGET'>
                <input className='EchoText' type="text" defaultValue="{}" id="EchoMessage"/>
                <button className='EchoButton' id="EchoButton" onClick={this.props.handleQuery}>Find</button>
            </div>
        );
    };
}

export default DatabaseQuery;
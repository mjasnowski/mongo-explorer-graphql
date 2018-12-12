import React from 'react';
import axios from 'axios';

class EchoInput extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt){
        let messageValue = document.getElementById('EchoMessage').value;
        axios.get(`/echo/${messageValue}`)
            .then(resp => {
                alert(resp.data.message);
            })
            .catch(error => {
                alert("An Error Occurred during Echo");
            });
    }

    render(){
        return (
            <div className='EchoInput'>
                <input className='EchoText' type="text" defaultValue="{}" id="EchoMessage"/>
                <button className='EchoText' id="EchoButton" onClick={this.handleClick}>Echo</button>
            </div>
        );
    };
}

export default EchoInput;
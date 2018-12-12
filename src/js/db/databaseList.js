import React from 'react';
import Database from './database'


class DatabaseList extends React.Component {
    constructor(props){
        super(props);
    }



    render(){
        let dbObj = this.props.databaseDocuments;
        return (
            <div className="APPLICATION_CONTENT_WIDGET">
                {
                    Object.values(dbObj.databases).map((db) =>  
                        <Database name={db.name} handleClick={this.props.handleClick}/>
                    )

                }                   
            </div>
        );
    };


}

export default DatabaseList;
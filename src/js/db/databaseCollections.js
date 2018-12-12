import React from 'react';
import DatabaseCollection from './databaseCollection';


class DatabaseCollections extends React.Component {
    constructor(props){
        super(props);
    }
  

    render(){
        let clObj = this.props.collectionDocuments;
        // Have to extract here due to GraphQL update, expect an array
        // here
        clObj = clObj.collections;
        if (clObj != null && clObj.length > 0) {
            return (
                <div>
                    <div className='APPLICATION_CONTENT_WIDGET'>
                        {
                            Object.values(clObj).map((collection) =>  
                                <DatabaseCollection id={collection.name} name={collection.name} handleClick={this.props.handleClick}/>
                            )

                        }                        
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };


}

export default DatabaseCollections;
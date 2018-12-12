import React from 'react';
import DatabaseCollection from './databaseCollection';


class DatabaseCollectionDocument extends React.Component {
    constructor(props){
        super(props);
    }
  

    render(){
        let clObj = this.props.value;  
        clObj = clObj.collection;    
        if (clObj != null && clObj.length > 0) {
            return (
                <div className='APPLICATION_CONTENT_WIDGET'>
                  <div className="DocumentViewer">
                    {
                            Object.values(clObj).map((document) =>  
                                <div className="Document"><pre>{JSON.stringify(JSON.parse(document.document),null,'\t')}</pre></div>
                                    
                            )
                    }
                  </div>
                </div>
            );
            
        }else{
            return null;
        }
            

    };


}

export default DatabaseCollectionDocument;
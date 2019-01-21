import React from 'react';
import Button from '../ui/button';

const closeIcon = <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#000000" d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" />
</svg>;

class DatabaseCollectionDocument extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt){
        this.props.handleClick(evt);
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
                                <div className="Document">
                                   <div id="Document_Row_Container_ID">
                                    <pre>{JSON.stringify(JSON.parse(document.document),null,'\t')}</pre> 
                                   </div>
                                   <Button icon={closeIcon} handleClick={this.handleClick}/>
                                </div> 
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
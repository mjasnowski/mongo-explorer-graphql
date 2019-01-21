import React from 'react';
import Header from './header';
import DatabaseList from './db/databaseList';
import DatabaseCollections from './db/databaseCollections';
import DatabaseCollectionDocument from './db/databaseCollectionDocument';
import DatabaseQuery from './db/databaseQuery';

import * as query from './query/graphql';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentDatabase: null,
            currentCollection: null,
            databases: {databases:[]},
            collections: {collections:[]},
            collection: {collection:[]}
        }

        this.getDatabases = this.getDatabases.bind(this);
        this.getDatabaseCollections = this.getDatabaseCollections.bind(this);
        this.getDatabaseCollection = this.getDatabaseCollection.bind(this);
        this.queryDatabase = this.queryDatabase.bind(this);

        this.deleteDocument = this.deleteDocument.bind(this);
    }

    //
    // Retrieves the list of databases
    //
    getDatabases(){
        query.getDatabases()
        .then(resp => {
            this.setState({
                databases: resp.data.data
            })
        })
        .catch(error => {
            alert("An Error Occurred during Query: " + error.message);
        });       
    }

    //
    // Returns the list of collections for a database
    //
    getDatabaseCollections(databaseName){
        let database = databaseName.target.id;
        query.getDatabaseCollections(databaseName)
        .then(resp => {
            this.setState( {
                collections : resp.data.data,
                currentDatabase: database
            });
        })
        .catch(error => {
            alert("An Error Occurred during Database Collections Retrieval: " + error);
        });       
    }       

    //
    // Returns the list of documents for the specified collection of the 
    // specified database
    //
    getDatabaseCollection(collectionName){
        let collection = collectionName.target.id;
        query.getDatabaseCollection(this.state.currentDatabase,collectionName)
        .then(resp => {
            this.setState( {
                collection : resp.data.data,
                currentCollection: collection
            });
        })
        .catch(error => {
            alert("An Error Occurred during Database Collections Retrieval: " + error);
        });       
    }

    //
    // Sends a query against the current database and collection 
    //    
    queryDatabase(){
        let messageValue = document.getElementById('EchoMessage').value;
        if (messageValue == "") {
            messageValue = "{}";
        }else{
            // This is so the mongo db query stays properly formatted as a JSON expression
            messageValue = messageValue.replace(/\"/g,'\\"');
        }
        query.queryDatabase(this.state.currentDatabase, this.state.currentCollection, messageValue)
        .then(resp => { 
            // Contruct collection because the query comes back typed as 'find'
            let newCollection = { "collection": Object.assign(resp.data.data.find) };   
            this.setState( {
                collection : newCollection
            });
        })
        .catch(error => {
            alert("An Error Occurred during Database Collections Retrieval: " + error);
        }); 
    }   

    //
    // Sends a delete document request for the current database and collection
    //
    deleteDocument(evt){
        alert("Delete Document in progress...");
        // query.deleteDatabase(this.state.currentDatabase,this.state.currentCollection)
        // .then(resp => {
        //     this.setState( {
        //         result : resp.data.data
        //     });
        // })
        // .catch(error => {
        //     alert("An Error Occurred during Document Delete: " + error);
        // });        
    }

    //
    // Render the UI elements
    //
    render(){
        return (
            <div className="APPLICATION">
              <div className="APPLICATION_NAVIGATION">
                 <Header label="Databases"/>
                  <DatabaseList databaseDocuments={this.state.databases} 
                               handleClick={this.getDatabaseCollections}/>                
                 <Header label="Collections"/>    
                 <DatabaseCollections collectionDocuments={this.state.collections} 
                                      currentCollection={this.state.collection}
                                      handleClick={this.getDatabaseCollection}/>      
                 <div className="APPLICATION_CONTENT_WIDGET">
                      <span className="APPLICATION_CONTENT_WIDGET_CONTENT">
                           3
                      </span>
                 </div>                                                                                
              </div>
              <div className="APPLICATION_CONTENT">
               <Header label="Documents"/>   
               <DatabaseQuery handleQuery={this.queryDatabase}/>
               <DatabaseCollectionDocument id={'COLLECTION_DOCUMENT_ID'} value={this.state.collection} handleClick={this.deleteDocument}/>                                               
              </div>
            </div>
        );
    };

    // Populate initial view with list of databases
    componentDidMount(){
        this.getDatabases();
    }

}

export default App;
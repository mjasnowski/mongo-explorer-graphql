import axios from 'axios';


export const getDatabases = () => {
    return axios.post("/graphql",{"query":"query{databases{name}}"});
}

export const getDatabaseCollections = (databaseName) => {
    let database = databaseName.target.id;
    let queryStr = `query{collections(dbName:"${database}"){name}}`;
    return axios.post("/graphql",{"query":queryStr})    
}

export const getDatabaseCollection = (databaseName, collectionName) => {
    let collection = collectionName.target.id;
    let queryStr = `query{collection(dbName:"${databaseName}",cName:"${collection}"){document}}`;
    return axios.post("/graphql",{"query":queryStr})    
}

export const queryDatabase = (databaseName, collectionName, filter) => {
    let queryStr = `query{find(dbName:"${databaseName}",cName:"${collectionName}",filter:"${filter}"){document}}`;  
    return axios.post("/graphql",{"query":queryStr})    
}

export const deleteDocument = (databaseName, collectionName, documentId) => {
    let queryStr = `query{collection(dbName:"${databaseName}",cName:"${collection}"){document},documentId:"${documentId}}`;
    return axios.post("/graphql",{"query":queryStr})    
}


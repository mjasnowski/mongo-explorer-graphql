import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';

const server = express();

// Express Config
let port = 8080;
let host = "localhost";

// MongoDB Config
let mongoPort = 27017;
let mongoHost = "localhost";
let mdb;

// Establish connection object
MongoClient.connect(`mongodb://${mongoHost}:${mongoPort}`, (err, database) => {
    mdb = database;
    console.log("MongoDB Database Connected To...");
});

// Tell Express to use the current directory for static content for now (i.e. index.html)
server.use(express.static('.'));

// Tell Express to parse message body as JSON documeng
server.use(bodyParser.json());
 
// GraphQL Middleware w/ Resolvers
server.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Database {
            name: String!
        }
        type Collection {
            name: String!
        }
        type CollectionDocument {
            document: String!
        }
        type RootQuery {
            databases: [Database!]!
            collections(dbName: String!): [Collection!]!
            collection(dbName: String!, cName: String!): [CollectionDocument!]!
            find(dbName: String!, cName: String!, filter: String!): [CollectionDocument!]!
        }

        type Result {
            success: Boolean!
        }

        type RootMutation {
            deleteDocument(dbName: String!, cName: String!, documentId: String!): Result!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {

        databases: async () => {

            return await mdb.db().admin().listDatabases().then ( databases => {
                var dbs = [];
                for (let db of databases.databases){
                    // Create a DB object so its gets a name field
                    const database = { name: db.name };                   
                    dbs.push(database);
                }
                return dbs;
            })

        },

        collections: async (args) => {

            return await mdb.db(args.dbName).listCollections().toArray().then (collections => {
                var cols = [];
                for (let col of collections){
                    // Create a new Collection object so it gets a name field
                    const collection = { name: col.name };
                    cols.push(collection);
                }
                return cols;
            })
        },

        collection: async (args) => {

            return await mdb.db(args.dbName).collection(args.cName).find().toArray().then (collection => {
                var col = [];
                for (let doc of collection){
                    const collectionDocument = { document: JSON.stringify(doc) };
                    col.push(collectionDocument);
                }
                return col;
            })
        },   
        
        find: async (args) => {

            return await mdb.db(args.dbName).collection(args.cName).find(JSON.parse(args.filter)).toArray().then (collection => {
                var col = [];
                for (let doc of collection){
                    const collectionDocument = { document: JSON.stringify(doc) };
                    col.push(collectionDocument);
                }
                return col;
            })
        },
        
        deleteDocument: async (args) => {
            let query = {"_id":ObjectID(args.documentId)};
            return await mdb.db(args.dbName).collection(args.cName).deleteOne(query).then (result => {
                return {"success": (result.deletedCount == 1)};
            })
        }

    },
    graphiql: true
}))

//
// KEEPING THESE REST API FOR NOW
//

// // Query a specified collection of a specified database
// server.post(['/databases/:database/collections/:collection'], (req,res) => {
//     let filter = req.body.filter;
//     //console.info("Filter: " + req.body.filter);   
//     mdb.db(`${req.params.database}`).collection(`${req.params.collection}`).find(JSON.parse(`${filter}`)).toArray().then (collection => res.send ({collection: collection }));    
// });

// Retrieve Database Statistics
// server.get(['/databases/:database/stats'], function(req, res) {
//     mdb.db(`${req.params.database}`).stats().then (stats => res.send ({stats: stats }));     
// });

// Start the BackEnd Server
server.listen(port,host, () => {
    console.info("MongoDB Explorer Server listening on ", host, port);
});
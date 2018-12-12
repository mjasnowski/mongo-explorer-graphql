# mongo-explorer-graphql

This is the same MongoDB Explorer prototype as <b>https://github.com/mjasnowski/mongo-explorer</b> but has a GraphQL backend. The 'express-graphql' and 'graphql' npm packages are used in the backend.

The front-end sends graphql queries using Axios and POST requests, longer term I will be looking at something like Apollo on the front-end.

<b>NOTE:</b> The 'filter' argument for the 'find' query must use backslashes to escape the double quotes in the value if using the Graphiql Debug UI. The values for 'find' are expected to be valid MongoDB query language queries and the explorer application will do this for the user.

The Schema for the GraphQL queries are:

<pre>
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
        schema {
            query: RootQuery
        }
        
</pre>

The graphiql debug UI is enabled in mongoServer.js so you can try out queries w/o the front-end by using <b>localhost:8080/graphql</b>

<b>Screen Shot 1 / Main Explorer Window<b>

<img src="https://github.com/mjasnowski/mongo-explorer-graphql/blob/master/screenshots/screenshot1.png"/>

<b>Screen Shot 2 / Using Graphiql Debug UI<b>

<img src="https://github.com/mjasnowski/mongo-explorer-graphql/blob/master/screenshots/screenshot2.png"/>

# mongo-explorer-graphql

This is the same MongoDB Explorer prototype as <b>https://github.com/mjasnowski/mongo-explorer</b> but has a GraphQL backend

The front-end sends graphql queries using Axios and POST requests, longer term I will be looking at something like Apollo on the front-end.

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

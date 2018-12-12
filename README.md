# mongo-explorer-graphql

This is the same MongoDB Explorer prototype as github.com/mjasnowski/mongo-explorer but has a GraphQL backend

The front-end sends graphql queries using Axios and POST requests, longer term I will be looking at something like Apollo on the front-end.

The Schema for the GraphQL queries is

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

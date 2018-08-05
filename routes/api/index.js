const graphqlHTTP = require('express-graphql');

const schema = require('../../src/graphql/Schema');
const resolver = require('../../src/graphql/Resolver');

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
})
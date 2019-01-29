const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
    } = require('graphql');

// Country basic info
const CountryInfo = new GraphQLObjectType({
    name: "CountryInfo",
    fields: () => ({
        name: { type: GraphQLString },
        capital: { type: GraphQLString },
        population: { type: GraphQLInt },
        flag: { type: GraphQLString },
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        info: {
            type: new GraphQLList(CountryInfo),
            resolve(parent, args) {
                return axios.get('https://restcountries.eu/rest/v2/all').then( res => res.data );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
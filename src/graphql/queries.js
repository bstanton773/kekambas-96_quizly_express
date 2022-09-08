// Import Types from GraphQL
const { GraphQLList, GraphQLID } = require('graphql');
// Import our own created type
const { UserType } = require('./types');
// Import model so we can get data from MongoDB
const { User } = require('../models');


const users = {
    type: new GraphQLList(UserType),
    description: "Query all users in the database",
    resolve(parent, args){
        return User.find()
    }
}


const user = {
    type: UserType,
    description: "Query user by id",
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args){
        return User.findById(args.id)
    }
}


module.exports = {
    users,
    user
}

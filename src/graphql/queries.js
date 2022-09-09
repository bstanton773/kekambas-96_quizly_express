// Import Types from GraphQL
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
// Import our own created types
const { UserType, QuizType } = require('./types');
// Import model so we can get data from MongoDB
const { User, Quiz } = require('../models');

// Create a query that will get all of the users from the database. 
const users = {
    type: new GraphQLList(UserType),
    description: "Query all users in the database",
    resolve(parent, args){
        return User.find()
    }
}

// Create a query that will get a user by id - add id to args 
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


// Create a query that will get a quiz by the slug - add slig to args
const quizBySlug = {
    type: QuizType,
    description: 'Query quiz by its slug',
    args: {
        slug: { type: GraphQLString }
    },
    resolve(parent, args){
        return Quiz.findOne({ slug: args.slug })
    }
}


module.exports = {
    users,
    user,
    quizBySlug
}

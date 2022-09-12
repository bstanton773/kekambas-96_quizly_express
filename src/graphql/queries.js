// Import Types from GraphQL
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
// Import our own created types
const { UserType, QuizType, SubmissionType } = require('./types');
// Import model so we can get data from MongoDB
const { User, Quiz, Submission } = require('../models');

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


// Create a query that will get a quiz by the slug - add slug to args
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

// Create a query that will get a submission by submission id
const submissionById = {
    type: SubmissionType,
    description: 'Query quiz submission by id',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args){
        return Submission.findById(args.id)
    }
}


module.exports = {
    users,
    user,
    quizBySlug,
    submissionById
}

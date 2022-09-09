// Import built-in graphql type
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { User, Quiz } = require('../models')

//  Create a GraphQL type for the User 
const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            quizzes: {
                type: GraphQLList(QuizType),
                resolve(parent, args){
                    return Quiz.find({ userId: parent.id })
                }
            }
        })
    }
)


// Create a Quiz Type
const QuizType = new GraphQLObjectType(
    {
        name: 'Quiz',
        description: 'Quiz type',
        fields: () => ({
            id: { type: GraphQLID },
            slug: { type: GraphQLString },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLID },
            user: {
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                }
            }
        })
    }
)


// Create a Question Type - for query
const QuestionType = new GraphQLObjectType(
    {
        name: 'Question',
        description: 'Question Type',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            correctAnswer: { type: GraphQLString },
            quizId: { type: GraphQLID },
            order: { type: GraphQLInt },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            }
        })
    }
)

// Create a Question Input Type - for mutation of creating Quizzes
const QuestionInputType = new GraphQLObjectType(
    {
        name: 'QuestionInput',
        description: 'Question Input Type',
        fields: () => ({
            title: { type: GraphQLString },
            order: { type: GraphQLInt },
            correctAnswer: { type: GraphQLString }
        })
    }
)

module.exports = {
    UserType,
    QuizType,
    QuestionType,
    QuestionInputType
}

// Import built-in graphql type
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLFloat } = require('graphql');
const { User, Quiz, Question, Submission } = require('../models')

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
            },
            submissions: {
                type: GraphQLList(SubmissionType),
                resolve(parent, args){
                    return Submission.find({ userId: parent.id })
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
            },
            questions: {
                type: GraphQLList(QuestionType),
                resolve(parent, args){
                    return Question.find({ quizId: parent.id })
                }
            },
            submissions: {
                type: GraphQLList(SubmissionType),
                resolve(parent, args){
                    return Submission.find({ quizId: parent.id})
                }
            },
            avgScore: {
                type: GraphQLFloat,
                async resolve(parent, args){
                    const submissions = await Submission.find({ quizId: parent.id });
                    let score = 0;

                    for (const submission of submissions){
                        score += submission.score
                    };
                    return score / submissions.length;
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
const QuestionInputType = new GraphQLInputObjectType(
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

// Create an Answer Input Type - for mutation of submitting a quiz
const AnswerInputType = new GraphQLInputObjectType(
    {
        name: 'AnswerInput',
        description: 'Answer Input Type',
        fields: () => ({
            questionId: { type: GraphQLID },
            answer: { type: GraphQLString }
        })
    }
)

// Create a Submission type - for querying quiz submissions
const SubmissionType = new GraphQLObjectType(
    {
        name: 'SubmissionType',
        description: 'Submission type',
        fields: () => ({
            id: { type: GraphQLID },
            quizId: { type: GraphQLID },
            userId: { type: GraphQLID },
            score: { type: GraphQLInt },
            user: {
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                }
            },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            }
        })
    }
)

module.exports = {
    UserType,
    QuizType,
    QuestionType,
    QuestionInputType,
    AnswerInputType,
    SubmissionType
}

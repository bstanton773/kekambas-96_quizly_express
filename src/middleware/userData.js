const axios = require('axios');


const userData = async (req, res, next) => {
    if (!req.verifiedUser){
        next()
        return
    }
    const query = `
        query user($id: ID!){
            user(id: $id){
            id,
            quizzes{
                id,
                slug,
                title,
                description,
                questions{
                    title,
                    order,
                    correctAnswer
                    }
                }
            }
        }
    `
    let data = {}
    try{
        data = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query,
                variables: {
                    id: req.verifiedUser.user._id
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch(err) {
        console.log(err)
    }

    req.verifiedUser.user.quizzes = data?.data?.data?.user?.quizzes ?? [];

    next()
}

module.exports = { userData }

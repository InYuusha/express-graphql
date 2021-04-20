const express = require('express')
const {graphqlHTTP}=require('express-graphql')
const schema = require('./graphqlSchema/schema')


const app = express()

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true

})
)

//listen
app.listen(3000,()=>console.log("Server is running on port 3000"))
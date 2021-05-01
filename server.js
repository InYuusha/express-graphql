const express = require('express')
const {graphqlHTTP}=require('express-graphql')
const schema = require('./graphqlSchema/schema')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/graphqltut",{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on('connect',()=>console.log("Server connected to database"))
const app = express()

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true

})
)

//listen
app.listen(3000,()=>console.log("Server is running on port 3000"))
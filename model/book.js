const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name:String,
    pages:Number,
    authorId:String
})
module.exports=mongoose.model("book",bookSchema)
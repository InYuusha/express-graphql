const {
    GraphQLSchema,
    GraphQLID,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
}=require('graphql')

var fakeBookDatabase = [
    { name:"Book 1", pages:432 , id:1},
    { name: "Book 2", pages: 32, id: 2},
    { name: "Book 3", pages: 532, id: 3 }
]

const bookType = new GraphQLObjectType({
    name:"book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        pages:{type:GraphQLInt}
    })
})

const rootQuery = new GraphQLObjectType({
    name:"rootQueryType",
    fields:()=>({
        book:{
            type:bookType,
            args:{ id:{type:GraphQLID}},
            resolve(parent,args){
                return fakeBookDatabase.find((item)=>{if(item.id==args.id)return item})
            }
           
        },
        books:{
            type:new GraphQLList(bookType),
            resolve(){
                return fakeBookDatabase;
            }
        }
    })

})
module.exports = new GraphQLSchema({
    query: rootQuery
});
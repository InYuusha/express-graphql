const _=require('lodash')

const book=[
    {   id:"2",
        name:"Subtle art of not giving a fuck",
        pages:144,
        authorId:"1"
    },
    {   id:"4",
        name:"Rich dad poor dad",
        pages:322,
        authorId:"3"
    },
    {   id:"7",
        name:"Harry Potter and the Prisoner of Azkaban",
        pages:244,
        authorId:"2"
    },
]

const author=[
    {
        name:"Richard samuel",
        age:47,
        id:"1"
    },
    {
        name:"J.K Rowlings",
        age:42,
        id:"2"
    },
    {
        name:"Robert Kiosak",
        age:42,
        id:"3"
    },
]
const {
    GraphQLSchema,
    GraphQLID,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
}=require('graphql')



const bookType = new GraphQLObjectType({
    name:"book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        pages:{type:GraphQLInt},
        author:{
            type:authorType,
            resolve(parent,args){
                return _.find(author,{id:parent.authorId})

            }

        }
    })
})

const authorType = new GraphQLObjectType({
    name:"author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        book:{
            type: bookType,
            resolve(parent,args){
                return _.find(book,{authorId:parent.id})

            }
        }
    })
})

const rootQuery=new GraphQLObjectType({
    name:"rootQuery",
    fields:()=>({
        book:{
            type:bookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(book,{id:args.id})

            }
        },
        author:{
            type:authorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(author,{id:args.id})
            }

        }
    })
   
})


module.exports = new GraphQLSchema({
    query: rootQuery
});
export const typeDefs=`#graphql
    type Game{
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query{
        reviews: [Review]
        games: [Game]
        authors: [Author]
        review(id:ID): Review 
        game(title:String): Game
        author(authorId:String): Author
    }
`

/*
    ^   Query Variables :

    ! review(id:ID): Review .
    ? This id here is a query variable which can be used to get a single review from the database based on the ID.
*/
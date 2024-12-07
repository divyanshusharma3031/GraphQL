import db from "./_db.js";
export const resolvers={
    Query :{
        authors(){
          return db.authors
        },
        games(){ // The Resolver for games name is same as in typedef
            return db.games
        },
        reviews(){ // The resolver for reviews
            return db.reviews
        },
        review(parent,args){
            //^ args here stands for argument we can have any query variable that we have passed from the args that you have passed as a parameter from the frontend
            return db.reviews.find((review)=>review.id===args.id);
        },
        game(parent,args){
            return db.games.find((game)=>game.title===args.title);
        },
        author(parents,args){
            return db.authors.find((author)=>author.id===args.authorId)
        }
    },
    Game : {
        /*
            ! Note that this Game is outside the Query Object
            ^  Jo bhi query se game return hoga uske nested mai ham ye chala sakte hai
        */
        reviews(parent){
            return db.reviews.filter((review)=>review.game_id===parent.id)
        }
    },
    Author :{
        reviews(parent)
        {
            return db.reviews.filter((review)=>review.author_id===parent.id);
        }
    },
    Review:{
        game(parent)
        {
            //* game axsociated with a particular review
            return db.games.find((game)=>game.id===parent.game_id);
        },
        author(parent)
        {
            return db.authors.find((author)=>author.id===parent.author_id)
        }
    }
}

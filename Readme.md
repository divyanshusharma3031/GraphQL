# Graph QL vs Rest API

Both are stateless, client independent api for exchanging data But Graphql is highly flexible.

## Rest Api Limitations 
- You may overfetch data.
- You may underfetch data.

Graphql is ideal for apps where you often have different data , where different data requirements on different pages .

Flow will be like this :

we have a rich query in the frontend which will be sent to the backend where it is parsed and the required fields are retrieved.


## How does a graphQL works?

we have a single end point which is post and there we will send a body which will be parsed.

# Operations types in Graphql

Query ~ Retrieve Data ( Similar to get request of REST API)

Mutation ~ Changes data ( Similar to POST ,PUT , PATCH , DELETE)

Subscription ~ Set Up realTime Connections via webSockets.



## Packages added 

- graphql- This is used for defining our schemas of the graphql like  query , mutation , subscription
- apollo-server - A simple server that is used to parse the incoming request.

## Apollo Explorer

TLDR ; Postman for graphql

## Types in Graphql

There are majorly 5 types in graphQl - int, float ,string , boolean , ID.
We can make our own types using this.

we use **type** to defien a type.

## Typedefs and resolver
- Typedefs are like blueprints
- Resolvers are the brains who actually do the work for querying( as apparent from the name apki query ko resolve karega.)
- Important thing to note here is that jo bhi cheeze ap is typedef mai define karte hai , wo hi cheeze accesbile hongi query karte waqt bhi.

## Query Variables :
```
review(id:ID): Review

```
- This id here is a query variable which can be used to get a single review from the database based on the ID.

The above example describes how you can define a type with a query variables .

Now the *Resolver* for this type can be defined as follows :

``` 
review(parent,args){        
    return db.reviews.find((review)=>review.id===args.id);
}

```

- args here stands for argument we can have any query variable that we have passed from the args that you have passed as a parameter from the frontend.

- parent here is the value returned from the parent function which return this  particular object ( See Nested queries below here it is a bit unclear , nested queries mai zyada clear hoga.)

## Consuming teh graphql end points 

- The query that returns a list of the data that we need

```
query GamesQuery {
  games {
    title,
    platform
  },
  authors {
    name,
    verified
  }
}

```

- If we want to consume and end point that have a query Variable then it can be done like this :

```

query ReviewQuery($id : ID!,$name:String!)
{
  review(id: $id) {
    content,
    rating
  }
}

```

- Notice here that all the variables that will be used must be passed from the global query and then they can be consumed inside.
- From the variables tag you will define the values of the variables in tehe json format Like this :

```
{
  "id":"1",
  "title":"Elden Ring",
  "authorId": "1",
}
```

- The flow will be all this field will gets converted with a $ sign in front of them and can be passe like that from the global query and then can be used by the resolvers 

*Example Query* :

```
query ReviewQuery($id : ID!,$title:String!,$authorId:String,)
{
  review(id: $id) {
    content,
    rating
  },
  game(title:$title) {
    id,
    platform,
  }
  author(authorId: $authorId) {
    name,
    verified
  }
}

```

*Example Query Variables* :

```
{
  "id":"1",
  "title":"Elden Ring",
  "authorId": "1",
}
```

## Querying Related Data in graphQL :

- Defining a Resolver :
  - Note that this object will be defined out of the Query object
  - Read aise karo - jo bhi reolver, Game return kar raha hai uspar ye query ham chala sakte hai
  - Jo bhi resolver , Author return kar rah hai uspar ham ye query fire kar sakte hai.
```
Game : {
      reviews(parent){
          return db.reviews.filter((review)=>review.game_id===parent.id)
      }
  },
  Author :{
      reviews(parent)
      {
          return db.reviews.filter((review)=>review.author_id===parent.id);
      }
  }
```
- Example  of a nested query :

```
query ReviewQuery($id : ID!,$title:String!,$authorId:String)
{
  review(id: $id) {
    content,
    rating
  },
  game(title:$title) {
    id,
    platform,
    reviews {
      rating,
      content
    }
  }
  author(authorId: $authorId) {
    name,
    verified
  }
}
```


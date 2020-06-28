// ------------------ Query Selectors & Projection Operators -------------------
// working with movies collection

// this data is in data.js make sure import it to your database
mongoimport data.json -d test-db -c movies --jsonArray --drop

// find all docs with runtime not equal to 60
db.movies.find({ runtime: { $ne: 60 } }).pretty();

// find all docs with runtime lower than 40
db.movies.find({ runtime: { $lt: 40 } });

// ------------------ Query Embedded Fields & Arrays ----------------------
// working with movies collection
// find movie ratings average greater than 7.0
db.movies.find({
  'rating.average': {
    $gt: 7
  }
});

// find movie with a genre array that has Drama in it
db.movies.find({
  genres: 'Drama'
});

// find movie with genre is exact match only containing 'Drama' or specific value
db.movies.find({
  genres: ['Drama']
});

// find all movie run times that have 30 [or] 42 runtime
db.movies.find({
  runtime: {
    $in: [30, 42]
  }
});

// find all movie run times that don't have runtime of 30 or 42
db.movies.find({
  runtime: {
    $nin: [30, 42]
  }
});

// multiple conditions with or operator $or
// find movies that have rating average that is less than 5 [or] greater than 9
db.movies.find({
  $or: [{
    'rating.average': {
      $lt: 5
    },
    'rating.average': {
      $gt: 9
    }
  }]
})

// multiple conditions with and operator $and 
// find all movies that have a genre of 'Drama' and 'Horror'
db.movies.find({
  $and: [{
    genres: 'Drama'
  }, {
    genres: 'Horror'
  }]
});

// find movies that are not equal to 60
db.movies.find({
  runtime: {
    $ne: 60
  }
});

// ------------------ Element Operators ----------------------
use user;

db.users.insertMany([{
  name: 'Max',
  hobbies: [{
    title: 'Sports',
    frequency: 3
  }, {
    title: 'Cooking',
    frequency: 6
  }],
  phone: 0131782734
}, {
  name: 'Manuel',
  hobbies: [{
    title: 'Cooking',
    frequency: 5
  }, {
    title: 'Cars',
    frequency: 2
  }],
  phone: '012177972',
  age: 30
}]);

// find all users that age exists
db.users.find({
  age: {
    $exists: true
  }
});

// find all users with phone values that are numbers
db.users.find({
  phone: {
    $type: 'number'
  }
});

// ------------------ $expr ----------------------
use financialData;

// doesn't take the value from these field but treats it as a hard input so basically a string so here your comparing the string volume to string target in order to actually compare the values in these field you need to put a dollar sign in front of each field name like this $volume, $target
$gt: ['volume', 'target']

db.sales.insertMany([{
  volume: 100,
  target: 120
}, {
  volume: 89,
  target: 80
}, {
  volume: 200,
  target: 177
}]);

// find all sales that have volume > target
db.sales.find({
  $expr: {
    $gt: ['$volume', '$target']
  }
});

// give me documents where volume is greater than target
// if volume gte 190 then subtract 10 and also try subtracting 30
// difference between volume and target needs to be at least 10 
// also try the difference needing to be at least 30 to see the query change
// result with 10 should give me 2nd and 3rd documents
// results with 30 should only give me the 2nd document
db.sales.find({
  $expr: {
    $gt: [{
        $cond: {
          if: {
            $gt: ['$volume', 190]
          },
          then: {
            $subtract: ['$volume', 30]
          },
          else: '$volume'
        }
      },
      '$target'
    ]
  }
});

// work with original.json file
db.movieStarts.insertMany([{
    "title": "The Last Student Returns",
    "meta": {
      "rating": 9.5,
      "aired": 2018,
      "runtime": 100
    },
    "visitors": 1300000,
    "expectedVisitors": 1550000,
    "genre": ["thriller", "drama", "action"]
  },
  {
    "title": "Supercharged Teaching",
    "meta": {
      "rating": 9.3,
      "aired": 2016,
      "runtime": 60
    },
    "visitors": 370000,
    "expectedVisitors": 1000000,
    "genre": ["thriller", "action"]
  },
  {
    "title": "Teach me if you can",
    "meta": {
      "rating": 8.5,
      "aired": 2014,
      "runtime": 90
    },
    "visitors": 590378,
    "expectedVisitors": 500000,
    "genre": ["action", "thriller"]
  }
]);

// 1) Import the attached data into a new database (e.g. boxOffice) and collection (e.g. movieStarts)
// 2) Search all movies that have a rating higher than 9.2 and a runtime lower than 100 minutes
db.movieStarts.find({
  'meta.rating': {
    $gt: 9.2
  },
  'meta.runtime': {
    $lt: 100
  }
});
// 3) Search all movies that have a genre of 'drama' or 'action'
db.movieStarts.find({
  genre: {
    $in: ['drama', 'action']
  }
});
// 4) Search all movies where visitors exceeded expectedVisitors
db.movieStarts.find({
  $expr: {
    $gt: ['$visitors', '$expectedVisitors']
  }
})

// ------------------ Query Arrays ----------------------
use user;

// looks inside of an array for any documents inside that array that contains title with value sports 
db.users.find({
  'hobbies.title': 'Sports'
});

// find users with exactly three hobbies
db.users.insertOne({
  name: 'Chris',
  hobbies: ['Sports', 'Cooking', 'Hiking']
});

db.users.find({
  hobbies: {
    $size: 3
  }
});

// find all movies that have a genre that have action and thriller order doesn't matter
db.movies.find({
  genres: ['Action', 'Thriller']
});

// #1 find all documents with a hobby of sports [and] frequency is greater than or equal to two 
db.users.find({
  $and: [{
    'hobbies.title': 'Sports'
  }, {
    'hobbies.frequency': {
      $gte: 2
    }
  }]
});

// find all documents with a hobby of sports and frequency of 2 without using $and operator
db.users.find({
  'hobbies.title': 'Sports',
  'hobbies.frequency': {
    $gte: 2
  }
})

// use of $elemMatch which will perform same method above labeled 1
// what to look for inside that embedded document
db.users.find({
  hobbies: {
    $elemMatch: {
      title: 'Sports',
      frequency: {
        $gte: 2
      }
    }
  }
});

// assignment
// 1) Import the attached data file into a new collection (e.g. exmoviestarts) in the boxOffice database 
mongoimport ex-movie.json -d test-db -c exmoviestarts --jsonArray --drop
// 2) Find all movies with exactly two genres 
db.exmoviestarts.find({ genre: { $size: 2 } });
// 3) Find all movies which aired in 2018
db.exmoviestarts.find({ 'meta.aired': 2018 });
// 4) Find all movies which have ratings array greater than  8 and lower than 10
db.exmoviestarts.find({ 
  ratings: 9
});

// ------------------ Applying Cursors ------------------------
// work with movies collection

// get the count of movies
db.movies.find().count();

// gives me the next document in movies collection
db.movies.find().next();

// give me the next document using variables
const movies = db.movies.find();
movies.next();

// fetch all docs in the database and print out each document
db.movies.find().forEach((movie) => printjson(movie));

// ------------------ Sorting Cursor Results -----------------------------------
// sort by rating.average that is ascending and runtime to descending
db.movies.find().sort({ 'rating.average': -1 });

// ------------------ Skipping & Limiting Cursor Results -----------------------
// in the cursor order doesn't matter
// sort by rating.average that is ascending and runtime to descending
// skip first 10
// limit results to 5
db.movies.find().sort({ 'rating.average': 1, runtime: -1 }).skip(10).limit(5).pretty();

// ------------------ Using Projection to Shape our Results --------------------
// find movies but for results I only want the name, genres, runtime, rating, no image
db.movies.find({}, { name: 1, genres: 1, runtime: 1, rating: 1 });

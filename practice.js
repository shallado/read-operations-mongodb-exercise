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
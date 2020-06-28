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


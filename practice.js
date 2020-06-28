// ------------------ Query Selectors & Projection Operators -------------------
// working with movies collection

// this data is in data.js make sure import it to your database
mongoimport data.json -d test-db -c movies --jsonArray --drop

// find all docs with runtime not equal to 60
db.movies.find({ runtime: { $ne: 60 } }).pretty();

// find all docs with runtime lower than 40
db.movies.find({ runtime: { $lt: 40 } });


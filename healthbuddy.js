// healthbuddy.js - The Health Buddy Web App

// using JSDoc
/** @use JSDoc */

// *** Load Node Modules ***

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser'); //Idk if i still need this yet
const glob = require('glob'); //Idk if i need this either

// Use two functions from db.js
const { connectToDb, getDb } = require('./db');

// include ObjectId and mongoDB
const { ObjectId } = require('mongodb');

// Start the express application
const app = express();

// Use json express middleware
app.use(express.json())

//// Render static files - May not be necessary anymore but lets see
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

// Set the view engine to ejs
app.set("view engine","ejs");

// *** End of 'preparation' section ***

// *** Working section ***

// Connect to the MongoDB Database
/* Must connect before listening for any requests,
that way if we can't connect, requests won't be made */

let db; // this will store the connection once we connect
connectToDb((err) => { // call connectToDb (from db.js) and pass a callback function as the argument
    // if the connection is a success, err argument will be null since we dont pass an err on a success
    // if the connection fails, the err will have a value.
    if (!err){
        // start listening for requests on port 5678 AFTER we know connection was a success.
        app.listen(5678, () => {
            console.log('app is listening on port 5678');
        });
        db = getDb(); // give me the database connection object so I can use it.
    }
});

// *** Page Display Route Handling ***
// I need to GET the ejs pages and display them on the front end.

// Root: Home page (index.ejs)
app.get("/", function (req, res){
    res.render('pages/index');
  });
  
// POST: Add a Meal (addMeal.ejs)
app.get("/pages/addMeal", function (req, res){
    res.render('pages/addMeal');
});

// GET: List all Meals (listStudents.ejs)
app.get("/pages/listMeals", function (req, res){
    res.render('pages/listMeals');
});

//***Request Route Handling***
// if i send a request to port 5678, this will determine how to handle it

// GET: Display all meals
app.get('/meals', (req, res) => { // get from localhost://meals
    let meals = []
    //get all the documents in the meals collection
    db.collection('meals')
        .find() // returns a cursor (object that points to the items of query)
                // toArray: Fetch all docs that cursor points to and put them in an array
                // forEach: Iterates each doc to process them individually
                // no parameter in find() means we are not filtering the query
        .sort({ date_added: -1 }) //sort the results by date added
        //.reverse()
        .forEach(meal => meals.push(meal)) // add each meal found to the array of meals

        // only starts when all meals being queried have been fetched and pushed to the array
        .then(() => {
            res.status(200).json(meals) /* respond w/ status 200 (all good!)
                                           and json string version of meals array */
        })
        .catch(() => { // if we could not fetch the meals
            res.status(500).json({error: 'Could not fetch the documents'}) // respond with an error
        })
})

// POST: Create a new meal entry
app.post('/meals', (req, res) => {
    const meal = req.body

    db.collection('meals')
        .insertOne(meal)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create meal'})
        })
})
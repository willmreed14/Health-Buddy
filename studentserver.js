// New studentserver.js, created with help from youtube

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
  
// POST: Add a student (addStudent.ejs)
app.get("/pages/addStudent", function (req, res){
res.render('pages/addStudent');
});

// PUT: Update Student (updateStudent.ejs)
app.get("/pages/updateStudent", function (req, res){
res.render('pages/updateStudent');
});

// DELETE: Delete student (deleteStudent.ejs)
app.get("/pages/deleteStudent", function (req, res){
res.render('pages/deleteStudent');
});

// GET: Display a single student (displayStudent.ejs)
app.get("/pages/displayStudent", function (req, res){
res.render('pages/displayStudent');
});

// GET: List all Students (listStudents.ejs)
app.get("/pages/listStudents", function (req, res){
res.render('pages/listStudents');
});


//***Request Route Handling***
// if i send a request to port 5678, this will determine how to handle it

// GET all students
app.get('/students', (req, res) => { // get from localhost://students
    let students = []
    //get all the documents in the students collection
    db.collection('students')
        .find() // returns a cursor (object that points to the items of query)
                // toArray: Fetch all docs that cursor points to and put them in an array
                // forEach: Iterates each doc to process them individually
                // no parameter in find() means we are not filtering the query
        .sort({ last_name: 1 }) //sort the results alphabetically by last name
        .forEach(student => students.push(student)) // add each student found to the array of students

        // only starts when all students being queried have been fetched and pushed to the array
        .then(() => {
            res.status(200).json(students) /* respond w/ status 200 (all good!)
                                           and json string version of students array */
        })
        .catch(() => { // if we could not fetch the students
            res.status(500).json({error: 'Could not fetch the documents'}) // respond with an error
        })
})

// GET a single student
app.get('/students/:id', (req,res) => { 

    if(ObjectId.isValid(req.params.id)){ // check if the id requested is valid (i.e. is it in the correct format)
        db.collection('students') // access the students collection
        .findOne({_id: new ObjectId(req.params.id)}) //find the document with the specified ID
        .then(doc => { // once the proper document is found, send the response
            res.status(200).json(doc)
        })
        .catch(err => { // if the document cannot be found, send an error
            res.status(500).json({error: 'Could not fetch the document'})
        })
    } else { 
        res.status(500).json({error: 'ID is not valid'})
    }
})

// POST: Create a new student

app.post('/students', (req, res) => {
    const student = req.body

    db.collection('students')
        .insertOne(student)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create student'})
        })
})

// DELETE: Delete a student

app.delete('/students/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)){ // check if the id requested is valid (i.e. is it in the correct format)
        db.collection('students') // access the students collection
        .deleteOne({_id: new ObjectId(req.params.id)}) //find the document with the specified ID
        .then(result => { // once the proper document is found, send the response
            res.status(200).json(result)
        })
        .catch(err => { // if the document cannot be found, send an error
            res.status(500).json({error: 'Could not delete the student'})
        })
    } else { 
        res.status(500).json({error: 'ID is not valid'})
    }
})

// PUT: Update a student

app.put('/students/:id', (req, res) => {
    const updates = req.body

    if(ObjectId.isValid(req.params.id)){ // check if the id requested is valid (i.e. is it in the correct format)
        db.collection('students') // access the students collection
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates}) //find the document with the specified ID
        .then(result => { // once the proper document is found, send the response
            res.status(200).json(result)
        })
        .catch(err => { // if the document cannot be found, send an error
            res.status(500).json({error: 'Could not updtae the student'})
        })
    } else { 
        res.status(500).json({error: 'ID is not valid'})
    }

})
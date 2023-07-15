const { MongoClient } = require('mongodb'); //MongoClient will allow us to connect to the database


let dbConnection
let uri = 'mongodb+srv://user:user@will-reed-cluster-0.fchmxea.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => { // initially connect to a database. 
        /* when we call connectToDb, we have to pass it a function (cb) as an argument, 
        which is a function we want to run after connection is established. */
        MongoClient.connect(uri) //connect to local database Student-Server
            .then((client) => { // after connecting, we get access to 'client', client is an object we created by connecting
                dbConnection = client.db() // client.db is the connection returned, lets extract that into a variable
                return cb()
            })
            .catch(err => { // this occurs if it fails to connect to the MongoDB database
                console.log(err)
                return cb(err) // if err occurs, pass it to cb func as an argument
            })
    },
    // at this point we are either connected or threw an error

    getDb: () => dbConnection // return a value: the database connection
}

//"mongodb+srv://"+config.db.user+":"+config.db.pass+"@will-reed-cluster-0.fchmxea.mongodb.net/?retryWrites=true&w=majority"
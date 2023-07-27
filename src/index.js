/* WHERE ALL JS CODE GOES */
// Import firebase functions that we need
import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where
} from 'firebase/firestore'

const firebaseConfig = { // which project are we connecting to?
    apiKey: "AIzaSyBQlSup34Crk1cSQITesL_eXNwsdyNPTXQ",
    authDomain: "fir-9-tutorial-e107f.firebaseapp.com",
    projectId: "fir-9-tutorial-e107f",
    storageBucket: "fir-9-tutorial-e107f.appspot.com",
    messagingSenderId: "505528702084",
    appId: "1:505528702084:web:8288b00d87265ee464ded1"
  };

// initialize the app based on the firebase config settings
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where("author", "==", "subtronics")) // fetch docs in col. WHERE x = y 

// ** REAL TIME ** GET (fetch) the documents in a collection (query now tho)
onSnapshot(q, (snapshot) =>{ // fire function whenever a change occurs
    let books = [] // add it to the books array
    snapshot.docs.forEach((doc) => { // cycle thru objects
        books.push({ ...doc.data(), id: doc.id }) // get the data and id #
    })
    console.log(books) // log the books array to the console
})

// GET (fetch) the documents in a collection **NOT REAL TIME THO**
/*
getDocs(colRef)
    .then((snapshot) => { // for each object in this snapshot
        let books = [] // add it to the books array
        snapshot.docs.forEach((doc) => { // cycle thru objects
            books.push({ ...doc.data(), id: doc.id }) // get the data and id #
        })
        console.log(books) // log the books array to the console
    })
    .catch(err => {
        console.log(err.message)
    })
*/

// POST (add) a new document to a collection
const addBookForm = document.querySelector('.add') // store add form in a constant
addBookForm.addEventListener('submit', (e) => { // fire a function on form submit
    e.preventDefault() // don't refresh the page upon submit

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value, 
    })
    .then(() => { // async, clear the form once the user submits (don't refresh the page tho)
        addBookForm.reset()
    })

})

// DELETE an existing document from a collection
const deleteBookForm = document.querySelector('.delete') // store delete form in a constant
deleteBookForm.addEventListener('submit', (e) => { // fire a function on form submit
    e.preventDefault() // don't refresh the page upon submit

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
        .then(() => { // async, clear the form once the user submits (don't refresh the page tho)
            deleteBookForm.reset()
        })

})

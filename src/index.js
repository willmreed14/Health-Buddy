/* WHERE ALL JS CODE GOES */
// Import firebase functions that we need

// imports from app
import { initializeApp } from 'firebase/app'

// imports from firestore
import { 
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

// imports from auth
import {
    getAuth, 
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

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
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt')) // fetch docs in col. WHERE x = y 

// ** REAL TIME ** GET (fetch) the documents in a collection (query now tho)
const unsubCol = onSnapshot(q, (snapshot) =>{ // fire function whenever a change occurs
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
        createdAt: serverTimestamp()
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

// get a single document
const docRef = doc(db, 'books', 'hwwzGB8xTD5n954aX3gQ')

/*
getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })
*/

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'

    })
    .then(()=>{
        updateForm.reset
    })

})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit',(e)=> {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred)=> {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err)=> {
            console.log(err.message)
        })
})

// logging out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(()=> {
            //console.log('the user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// logging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //console.log('User logged in:', cred.user)
        })
        .catch ((err) => {
            console.log(err.message)
        })
})

// subscribe to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => { // fire callback every time auth state changes
    console.log('user status changed: ', user)
})

// unsubscribe from all changes (auth & db)
/*
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
    console.log('Unsubscribing')
    unsubCol()
    unsubDoc()
    unsubAuth()

})
*/
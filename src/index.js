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

const firebaseConfig = {
    apiKey: "AIzaSyBMt9gDTINuwO4ockgxOneDqyNCmXXmqeU",
    authDomain: "project17-cen4010.firebaseapp.com",
    projectId: "project17-cen4010",
    storageBucket: "project17-cen4010.appspot.com",
    messagingSenderId: "989291484535",
    appId: "1:989291484535:web:e11174aed8909d60543d72",
    measurementId: "G-GB522TK712"
  };

// initialize the app based on the firebase config settings
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const mealsRef = collection(db, 'meals')
const workoutsRef = collection(db, 'workouts')

// queries
const qM = query(mealsRef, orderBy('date')) // fetch docs in col. WHERE x = y 
const qW = query(workoutsRef, orderBy('date')) // fetch docs in col. WHERE x = y 

// Function to update the table with the meals data
function updateTable(snapshot) {
    // Create a reference to the table body element
    const tableBody = document.querySelector("#books-table tbody");

    // Clear the table body before updating to avoid duplicate entries
    tableBody.innerHTML = "";

    // Iterate through each document in the 'snapshot.docs' array
    snapshot.docs.forEach((doc) => {
        // Extract the data from the document
        const bookData = doc.data();
        const bookID = doc.id;

        // Create a new row (table row) to represent the book entry
        const row = document.createElement("tr");

        // Add the book properties as table data (table cells) in the row
        const titleCell = document.createElement("td");
        titleCell.textContent = bookData.name;
        row.appendChild(titleCell);

        const authorCell = document.createElement("td");
        authorCell.textContent = bookData.calories;
        row.appendChild(authorCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = bookData.date;
        row.appendChild(dateCell);

        const idCell = document.createElement("td");
        idCell.textContent = bookID;
        row.appendChild(idCell);

        // Add more cells for additional book properties if needed

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to update the table with the workouts data
function updateWorkoutsTable(snapshot) {
    // Create a reference to the table body element
    const tableBody = document.querySelector("#workouts-table tbody");

    // Clear the table body before updating to avoid duplicate entries
    tableBody.innerHTML = "";

    // Iterate through each document in the 'snapshot.docs' array
    snapshot.docs.forEach((doc) => {
        // Extract the data from the document
        const workoutData = doc.data();
        const workoutID = doc.id;

        // Create a new row (table row) to represent the book entry
        const row = document.createElement("tr");

        // Add the book properties as table data (table cells) in the row
        const nameCell = document.createElement("td");
        nameCell.textContent = workoutData.name;
        row.appendChild(nameCell);

        const setsCell = document.createElement("td");
        setsCell.textContent = workoutData.sets;
        row.appendChild(setsCell);

        const repsCell = document.createElement("td");
        repsCell.textContent = workoutData.reps;
        row.appendChild(repsCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = workoutData.date;
        row.appendChild(dateCell);

        const idCell = document.createElement("td");
        idCell.textContent = workoutID;
        row.appendChild(idCell);

        // Add more cells for additional book properties if needed

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// onSnapshot is a method that listens for real-time updates to the query.
// Whenever a change occurs, the 'updateTable' function will be triggered to update the table with the new data.
onSnapshot(qM, updateTable);
onSnapshot(qW, updateWorkoutsTable);


// POST (add) a new MEAL to MEALS collection
const addMealForm = document.querySelector('.addMeal') // store add form in a constant
addMealForm.addEventListener('submit', (e) => { // fire a function on form submit
    e.preventDefault() // don't refresh the page upon submit

    addDoc(mealsRef, {
        name: addMealForm.name.value,
        calories: addMealForm.calories.value, 
        date: addMealForm.date.value
    })
    .then(() => { // async, clear the form once the user submits (don't refresh the page tho)
        addMealForm.reset()
    })

})

// POST (add) a new WORKOUT to WORKOUTS collection
const addWorkoutForm = document.querySelector('.addWorkout') // store add form in a constant
addWorkoutForm.addEventListener('submit', (e) => { // fire a function on form submit
    e.preventDefault() // don't refresh the page upon submit

    addDoc(workoutsRef, {
        name: addWorkoutForm.name.value,
        sets: addWorkoutForm.sets.value, 
        reps: addWorkoutForm.reps.value, 
        date: addWorkoutForm.date.value
    })
    .then(() => { // async, clear the form once the user submits (don't refresh the page tho)
        addWorkoutForm.reset()
    })

})

// DELETE an existing MEAL
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

// update a meal
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
const firebaseConfig = {
    apiKey: "AIzaSyDrntqAQrQhKXDRrZAonlbFqiHiRco8C3Q",
    authDomain: "project-17-cen4010-1b3db.firebaseapp.com",
    projectId: "project-17-cen4010-1b3db",
    storageBucket: "project-17-cen4010-1b3db.appspot.com",
    messagingSenderId: "512401244331",
    appId: "1:512401244331:web:7f21a4c9c4a2a77a5e77ee",
    measurementId: "G-QT5D0GFQLL"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// const db = firebase.firestore();

function logIn() {

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password).then (cred => {
        window.alert(cred.user.email + " logged in")
    })
}

function signUp() {

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password).then (cred => {
        window.alert(cred.user.email + " signed up")
    })
}
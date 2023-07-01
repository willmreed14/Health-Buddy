const firebaseConfig = {
    apiKey: "AIzaSyBMt9gDTINuwO4ockgxOneDqyNCmXXmqeU",
    authDomain: "project17-cen4010.firebaseapp.com",
    projectId: "project17-cen4010",
    storageBucket: "project17-cen4010.appspot.com",
    messagingSenderId: "989291484535",
    appId: "1:989291484535:web:e11174aed8909d60543d72",
    measurementId: "G-GB522TK712"
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

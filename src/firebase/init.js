import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCwLHWpl7z8k7-S5abWDQbi8QZHn68IqH4",
  authDomain: "quik-data.firebaseapp.com",
  databaseURL: "https://quik-data.firebaseio.com",
  projectId: "quik-data",
  storageBucket: "quik-data.appspot.com",
  messagingSenderId: "804432056360",
  appId: "1:804432056360:web:efb98f8a3908f91a"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();

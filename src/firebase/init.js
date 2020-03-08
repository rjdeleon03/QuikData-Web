import firebase from "firebase";

// Your web app's Firebase configuration

// PROD config
// var firebaseConfig = {
//   apiKey: "AIzaSyCwLHWpl7z8k7-S5abWDQbi8QZHn68IqH4",
//   authDomain: "quik-data.firebaseapp.com",
//   databaseURL: "https://quik-data.firebaseio.com",
//   projectId: "quik-data",
//   storageBucket: "quik-data.appspot.com",
//   messagingSenderId: "804432056360",
//   appId: "1:804432056360:web:efb98f8a3908f91a"
// };

// DEV config
var firebaseConfig = {
  apiKey: "AIzaSyDawEVMGpaIfWC14TIYEGSpGHDb5-VjKJU",
  authDomain: "cpu-quikdata-dev.firebaseapp.com",
  databaseURL: "https://cpu-quikdata-dev.firebaseio.com",
  projectId: "cpu-quikdata-dev",
  storageBucket: "cpu-quikdata-dev.appspot.com",
  messagingSenderId: "610352636713",
  appId: "1:610352636713:web:fc1d33d4b8b23f52d0cd38",
  measurementId: "G-ZRZ6FCVVCG"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default {
  db: firebaseApp.firestore(),
  storage: firebaseApp.storage(),
  auth: firebaseApp.auth()
};

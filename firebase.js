import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

// web app's Firebase configuration (Hao)
const firebaseConfig = {
  apiKey: "AIzaSyBMUuAhdumTGYMSVuWjRQmKSRKJhONusAg",
  authDomain: "peacefulgarden-a4b5c.firebaseapp.com",
  databaseURL:
    "https://peacefulgarden-a4b5c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "peacefulgarden-a4b5c",
  storageBucket: "peacefulgarden-a4b5c.appspot.com",
  messagingSenderId: "595789693308",
  appId: "1:595789693308:web:6c2e1faf2651b5c8e924f9",
  measurementId: "G-45KC4GX795",
};

// Evans firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAfvkrBJ52KyBurDg8nNeb8KQ3MvDbaUII",
//   authDomain: "greatful-2ffc2.firebaseapp.com",
//   databaseURL: "https://greatful-2ffc2-default-rtdb.firebaseio.com",
//   projectId: "greatful-2ffc2",
//   storageBucket: "greatful-2ffc2.appspot.com",
//   messagingSenderId: "884190027685",
//   appId: "1:884190027685:web:f8f58d582a4967838e524c",
//   measurementId: "G-JXG6XC1GND"
// }

// Simin's firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyASbnE1xWVevoKWKkG-Ika6fZoIsCRjY3M",
//   authDomain: "peacefulgarden-a4b5c-e541a.firebaseapp.com",
//   databaseURL:
//     "https://peacefulgarden-a4b5c-e541a-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "peacefulgarden-a4b5c-e541a",
//   storageBucket: "peacefulgarden-a4b5c-e541a.appspot.com",
//   messagingSenderId: "582001109306",
//   appId: "1:582001109306:web:1a1392ba21d8a57f0c8803",
//   measurementId: "G-JJTN727FLB",
// };

// initialize firebase
// expo will create the database whenever we refresh the built. In order to avoid the duplicates of database creation and errors, we use an if condition to control that.
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Create a firebase component and export
const fbdata = firebase;

export default fbdata;

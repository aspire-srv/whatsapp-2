import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD2LqUopaoDtRTRblB9g2AFJBKoJRUcx9I",
  authDomain: "whatsapp-2-c70b2.firebaseapp.com",
  projectId: "whatsapp-2-c70b2",
  storageBucket: "whatsapp-2-c70b2.appspot.com",
  messagingSenderId: "800528380475",
  appId: "1:800528380475:web:db2172a346aa6e17c5a21e"
};

const app = !firebase.apps.length
 ? firebase.initializeApp(firebaseConfig)
 : firebase.app();

 const db = app.firestore();
 const auth = app.auth();
 const provider = new firebase.auth.GoogleAuthProvider();

 export {db, auth, provider };

const firebaseConfig = {
  apiKey: "AIzaSyA3ra4E7chQhRzERyKW2aFUTRULMb10vxM",
  authDomain: "blogdaffadev.firebaseapp.com",
  databaseURL: "https://blogdaffadev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blogdaffadev",
  storageBucket: "blogdaffadev.firebasestorage.app",
  messagingSenderId: "489703180131",
  appId: "1:489703180131:web:4383f5ef04c1d414ce3556",
  measurementId: "G-ZWW4K4NVQ6"
};
  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
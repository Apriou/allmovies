import { initializeApp } from 'firebase';

export const initFirebase = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyCOT9wJHBTEIGbKgWfU4ZclZKmjCYPirZw",
        authDomain: "allmovies-37436.firebaseapp.com",
        databaseURL: "https://allmovies-37436.firebaseio.com",
        projectId: "allmovies-37436",
        storageBucket: "allmovies-37436.appspot.com",
        messagingSenderId: "732034533462",
        appId: "1:732034533462:web:dae4868f892751b7c1d3f7"
      };

      initializeApp(firebaseConfig);
}


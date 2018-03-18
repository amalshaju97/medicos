importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBDAHcsYk_pFuAzz2rmh70OSgGjjwf5ym4",
    authDomain: "onemedicos.firebaseapp.com",
    databaseURL: "https://onemedicos.firebaseio.com",
    projectId: "onemedicos",
    storageBucket: "onemedicos.appspot.com",
    messagingSenderId: "912611634058"
};
firebase.initializeApp(config);
firebase.messaging();

const messaging = firebase.messaging();
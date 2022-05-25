importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js');

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('../firebase-messaging-sw.js')
.then(function(registration) {
console.log('Registration successful, scope is:', registration.scope);
}).catch(function(err) {
console.log('Service worker registration failed, error:', err);
});
}



firebase.initializeApp({
apiKey: "AIzaSyAsILvpuX5Ixmq8VVYlQNX5WUahMdCXgDM",
authDomain: "caryn-notifications.firebaseapp.com",
projectId: "caryn-notifications",
storageBucket: "caryn-notifications.appspot.com",
messagingSenderId: "377816689161",
appId: "1:377816689161:web:8ddab1e742b1aaeacaa6d8",
measurementId: "G-FPENL1BNXG"
})

const initMessaging = firebase.messaging();





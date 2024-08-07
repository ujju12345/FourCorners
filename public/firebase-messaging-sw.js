importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCG4uXYTNhkwXF6MkTR7XPl3zR1EYiGbF0',
  authDomain: 'almantasha-notifee.firebaseapp.com',
  projectId: 'almantasha-notifee',
  storageBucket: 'almantasha-notifee.appspot.com',
  messagingSenderId: '270921098345',
  appId: '1:270921098345:web:23c6b53e5bc5088494eef8',
  measurementId: 'G-J7YFGF236E',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

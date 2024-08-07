import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCG4uXYTNhkwXF6MkTR7XPl3zR1EYiGbF0",
  authDomain: "almantasha-notifee.firebaseapp.com",
  projectId: "almantasha-notifee",
  storageBucket: "almantasha-notifee.appspot.com",
  messagingSenderId: "270921098345",
  appId: "1:270921098345:web:23c6b53e5bc5088494eef8",
  measurementId: "G-J7YFGF236E",
};

const app = initializeApp(firebaseConfig);

let messaging;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { messaging };

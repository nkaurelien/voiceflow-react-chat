import { createRoot } from 'react-dom/client';

import { RuntimeProvider } from './context';
import { App } from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "sdp.firebaseapp.com",
  projectId: "sdp",
  storageBucket: "sdp.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:00000000000:web:000000000000",
  measurementId: "G-XXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')!).render(
  <RuntimeProvider>
    <App />
    {/* <Demo /> */}
  </RuntimeProvider>
);

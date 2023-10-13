// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAKvT5FwSl8JVKRBHQt2Ea7DhqY4UomZJ4',
  authDomain: 'v-chat-70039.firebaseapp.com',
  databaseURL: 'https://v-chat-70039-default-rtdb.firebaseio.com',
  projectId: 'v-chat-70039',
  storageBucket: 'v-chat-70039.appspot.com',
  messagingSenderId: '359672821554',
  appId: '1:359672821554:web:1c21210d50322f8bb9492b',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);

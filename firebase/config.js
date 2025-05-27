// firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCVDNxuerxRyJaMYmfByvtITuQtGZ9U8F4",
  authDomain: "reminisce-92aea.firebaseapp.com",
  projectId: "reminisce-92aea",
  storageBucket: "reminisce-92aea.firebasestorage.app",
  messagingSenderId: "192325011277",
  appId: "G-BXJLXEPZHT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCVDNxuerxRyJaMYmfByvtITuQtGZ9U8F4",
  authDomain: "reminisce-92aea.firebaseapp.com",
  projectId: "reminisce-92aea",
  storageBucket: "reminisce-92aea.appspot.com",
  messagingSenderId: "192325011277",
  appId: "1:192325011277:web:bb6ccfa8db36042ed99904",
  measurementId: "G-BXJLXEPZHT"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

if (process.env.NODE_ENV === 'development') {
  console.log("FIREBASE CONFIG", firebaseConfig);
  console.log("🔥 Firebase API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
}

export { auth, db, storage };

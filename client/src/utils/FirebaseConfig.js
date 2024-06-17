import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBW6lXIlJ9b-ATzbH6iHLh2jjg4zLFFbiw",
    authDomain: "quickchat-529df.firebaseapp.com",
    projectId: "quickchat-529df",
    storageBucket: "quickchat-529df.appspot.com",
    messagingSenderId: "27111851126",
    appId: "1:27111851126:web:af6add23b40a9b403ecb57",
    measurementId: "G-FBNZG7CYPC"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);
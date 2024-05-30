import { initializeApp } from "firebase/app";
import { FIREBASE_APIKEY, FIREBASE_MEASUREMENTID, FIREBASE_APPID, FIREBASE_MESSAGE_SENDERID, FIREBASE_STORAGEBUCKET, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID } from "@env";

const firebaseConfig = {
    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTHDOMAIN,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDERID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID
};

export default app = initializeApp(firebaseConfig);
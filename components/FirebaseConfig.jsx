import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FBAPIKEY,
    authDomain: process.env.NEXT_PUBLIC_FBAUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FBPROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FBSTORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FBMESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FBAPPID,
    measurementId: process.env.NEXT_PUBLIC_FBMEASUREMENTID,
})
const storage = getStorage(app)

export default storage
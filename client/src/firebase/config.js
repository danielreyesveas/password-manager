import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyDGktsbuEkWou_TgTFfbH6_EOn2LVa-L64",
	authDomain: "pass-reciclatusanimales.firebaseapp.com",
	projectId: "pass-reciclatusanimales",
	storageBucket: "pass-reciclatusanimales.appspot.com",
	messagingSenderId: "883084594279",
	appId: "1:883084594279:web:10cbc3bd4d6158cf3858c2",
});

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default app;

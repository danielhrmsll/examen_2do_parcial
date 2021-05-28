import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyB8fZd5hAcm_Pi8RsOSoTP89SJWbicPHUM",
	authDomain: "examen-2do-parcial-pdp.firebaseapp.com",
	projectId: "examen-2do-parcial-pdp",
	storageBucket: "examen-2do-parcial-pdp.appspot.com",
	messagingSenderId: "267832519306",
	appId: "1:267832519306:web:dbe95ea0d90657a2e91b73",
	measurementId: "G-638H3GD9MR"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDAOtVIOaU20xg9QUG-mNWNK85rOMeuAAI",
	authDomain: "amzn-clone-yp.firebaseapp.com",
	databaseURL: "https://amzn-clone-yp.firebaseio.com",
	projectId: "amzn-clone-yp",
	storageBucket: "amzn-clone-yp.appspot.com",
	messagingSenderId: "897682132663",
	appId: "1:897682132663:web:147fb8becb1424e16b0732",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

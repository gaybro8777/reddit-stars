import * as firebase from 'firebase';
// This API key should be in an external file passed through as an environment
// variable, but for the sake of simplicity, it's included here in the repo.
const config = {
  apiKey: "AIzaSyDc8-HJ7jemoxxbqOf9u7PZHGnjtm1zpQs",
  authDomain: "easeit-63fb2.firebaseapp.com",
  databaseURL: "https://easeit-63fb2.firebaseio.com",
  projectId: "easeit-63fb2",
  storageBucket: "easeit-63fb2.appspot.com",
  messagingSenderId: "301479075998"
};

firebase.initializeApp(config);

export default firebase;

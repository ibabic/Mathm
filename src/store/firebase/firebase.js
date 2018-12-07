import * as firebase  from 'firebase';

var config = {
    databaseURL: "https://mathmind-b6baf.firebaseio.com/"
}

firebase.initializeApp(config);
export const db = firebase.database();
export const dbRef =db.ref().child('players');
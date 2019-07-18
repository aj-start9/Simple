import firebase from 'firebase'

    let config = {
        apiKey: 'AIzaSyDYITZ-jtuH88qB1Vn6tmDYb8BDDoryq0M',
        authDomain: 'simple-30744.firebaseapp.com',
        databaseURL: 'https://simple-30744.firebaseio.com/',
        projectId: 'simple-30744',
        storageBucket: 'simple-30744.appspot.com',
        messagingSenderId: '275107598856'
    }

   const firebase1 = firebase.initializeApp(config);


export default firebase1;
import * as firebase from 'firebase';  //* as, we take all firebase named exports and create a var for them. Then we access them from that variable

//this came from firebase, add firebase to your web app
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export { firebase, googleAuthProvider, database as default};

//   structuring database is like a javascript object
//   this is asynchronous, returns a promise, nothing comes back though 
//   database.ref().set({
//       name: 'Brett Mayer',
//       age: 32,
//       location: {
//           city: 'Jupiter',
//           country: 'United States'
//       }
//   }).then(() => {
//     console.log('Data is saved');
//   }).catch((error) => {
//     console.log('This failed', error);
//   });

 //does not have to take object
  //database.ref().set('This is my data');

//   database.ref().set({
//       age: 33  //will overrite all data
//   });


//will only overrite age
// database.ref('age').set(33);

//   //again, but this changes location nested cty
//   //inside ref is a child node
//   database.ref('location/city').set('Canton');

//   //add a new child node on root of the database, without adding it directly above
//   database.ref('attributes').set({
//         height: 74,
//         weight: 175
//   }).then(() => {
//       console.log('attributes saved')
//   }).catch((error) => {
//     console.log('Failed', error);
//   });


//***** REMOVING data from firebase

//database.ref('age').remove();

//another way
//database.ref('age').set(null);




//***** UPDATING data from firebase, supports promises also


// database.ref().update({  //just updating the fields passed, you can also add new properties here
//     name: 'Brett Mayer updated',  //could set an existing property null and remove it 
//     age: 32,
//     job: 'software developer',
//     // location: {
//     //     city: 'Atlanta'  //this will remove state, only updates at the root level
//     // }
//     'location/city': 'Atlanta'  //this is the syntax!
// });



//****** FETCHING DATA

//single time
// database.ref().once('value').then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//     console.log(val.name);
// }).catch((e) => {
//     console.log('Error: ', e)
// });

// database.ref('location').once('value').then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//     console.log(val.city);
// }).catch((e) => {
//     console.log('Error: ', e)
// });

// database.ref('location/city').once('value').then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// }).catch((e) => {
//     console.log('Error: ', e)
// });

// //get data with subscribe to any changes
// //not promise, snapshot is callback because promises can not be fullfilled more than once
// //returns the inline function, which we can pass to off to unsubscribe
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log('from on():', snapshot.val());
// }, (e) => {
//     console.log('Error: ', e);
// });

// setTimeout(() => {
//     database.ref().off('value', onValueChange);
//     console.log('unsubscribing');
// }, 4000);



//*****STORING DATA

//firebase does not allow you to store arrays, gets converted to object structure
//this is how you would store it

// const firebaseNotes = {
//     notes: {
//         e9832748327498324: {  //id
//             title: 'first note',
//             body: 'cool note'
//         },
//         b394393eu03: {
//             title: 'second note',
//             body: 'another cool note'
//         }
//     }
// }

// database.ref('notes').push({  //wow, push here is firebase method, this creates an id and puts title and body in it
//     title: 'course topics',
//     body: 'React, angular, python'
// });

//ex, grab id from firebase
// database.ref('notes/-L-o354212bZcF7LNCMt').update({
//     title: 'Developer course topics'
// });

//database.ref('notes/-L-o354212bZcF7LNCMt').remove();



//Challenge
// database.ref('expenses').push({
//     descripion: 'car payment',
//     note: 'due every month',
//     amount: '300',
//     createdAt: 2100
// });


//***** get objects back from database

// database.ref('expenses').once('value').then((snapshot) => {
//     //console.log(snapshot.val());  //you get objects back
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         console.log(childSnapshot.val());  //javascript object
//         expenses.push({   //push here is javascript
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });

//for challenge, same as above but subscribing to changes

// database.ref('expenses').on('value', (snapshot) => {
//     //console.log(snapshot.val()); 
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         console.log(childSnapshot.val()); 
//         expenses.push({   
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });



//using a different event than value
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });
 
// database.ref('expenses').on('child_added', (snapshot) => {  //called for existing children and new ones added
//     console.log(snapshot.key, snapshot.val());  
// });
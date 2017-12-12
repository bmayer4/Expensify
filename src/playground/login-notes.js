//make login page root of app /
//in firebase, go to authentication, sign in method, google, enable it.
//in firebase.js, set up a googleAuthProvider, export it 
//set up auth.js action generator startLogin (async), use it in LoginPage component (connected)

//For logout, add button inside header component, connect it to asyc action generator startLogout
//in app.js, we need to redirect based on log in status (yarn add history, to get history outside context of component registered with a route)
//we make the change in AppRouter.js, instead of using  <BrowserRouter>, we are using <Router> and passing our own history in 
//export history and import in app,js
//made hasRendered in app.js, we only want to render app once
//we want to store user.uid in redux, make a new auth.js reducer, and adding more actions in actions/auth.js
//make a change in store/configureStore.js
//then add dispatch calls to login and logout in app.js
//write test cases for login/logout reducers, and login/logout actions

//Now we need to authenticate our routes
//make private route file and use it in AppRouter.js
//put header in private route
//now I need to make login page a public route, using same way I did PrivateRoute component 

//now I have to associate users with expenses
//structure
// const db = {
//     users: {   //users in root
//         8384734userid39: {
//             expenses: {
//                 39expensesid39: {

//                 }
//             }
//         }
//     }
// };

//now we have to change database rules
//
//one of the few things we have access to in rules is auth.uid
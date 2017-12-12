import uuid from 'uuid';
import database from '../firebase/firebase';


//ADD EXPENSE (action generator), setting them up as named exports
//this will change the redux store
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense: expense
});

//return a function, not object like the others
//the function works because we set up the middleware with redux thunk
//the function gets called internally by redux, with dispatch
export const startAddExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expense = { description: description, note: note, amount: amount, createdAt: createdAt};

        //return so we can use then in test file
        return database.ref(`users/${uid}/expenses`).push(expense).then((snapshot) => {
            dispatch(addExpense({
                id: snapshot.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id: id}));
        });
    };
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({  //no defaults needed
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates
});

export const startEditExpense = (id, updates) => {  //updates is an object
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {  //return important for test then()
            dispatch(editExpense(id, updates));
        });
    };
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses: expenses
});

//asynchronous action 
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expenses = [];
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => { //return so the promise is returned so we can use then in app.js
            snapshot.forEach((childSnapshot) => {
                expenses.push({   
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
          dispatch(setExpenses(expenses));
        });
    };
};




//component calls action generator
//action generator returns object
//component dispatches object
//redux store changes


//---but with asyncronous actions....( we need to install redux-thunk middleware, yarn add redux-thunk, and make changes to configureStore)
//component calls action generator
//action generator returns function
//component dispatches function 
//function runs (has the ability to dispatch other actions and do whatever it wants)
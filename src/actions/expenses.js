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
    return (dispatch) => {

        const expense = { description: description, note: note, amount: amount, createdAt: createdAt};

        //return so we can use then in test file
        return database.ref('expenses').push(expense).then((snapshot) => {
            dispatch(addExpense({
                id: snapshot.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({  //no defaults needed
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates
});


//component calls action generator
//action generator returns object
//component dispatches object
//redux store changes


//---but with asyncronous actions....( we need to install redux-thunk middleware, yarn add redux-thunk, and make changes to configureStore)
//component calls action generator
//action generator returns function
//component dispatches function 
//function runs (has the ability to dispatch other actions and do whatever it wants)
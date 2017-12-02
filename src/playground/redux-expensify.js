import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';  //uuid is default export. had to use yarn add uuid

//ADD EXPENSE (action generator)
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note: note,
        amount: amount,
        createdAt: createdAt
    }
});


//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({  //no defaults needed
    type: 'EDIT_EXPENSE',
    id: id,
    updates: updates
});

//SET_TEXT_FILTER
const setTextFilter = ( text = '' ) => ({
    type: 'SET_TEXT_FILTER',
    text: text
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = (startDate) => ({  //undefined is already default value
    type: 'SET_START_DATE',
    startDate: startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate: endDate
});



//we will create a single reducer for each root property in our redux store

//Expenses reducer
const expensesReducerDefaultState  = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
        //state.push(action.expense);  //push changes state, and we want to avoid that
        //return state.concat(action.expense);   //this works but es6 spread operator is better :)
        return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            // return state.filter((expense) => {  //filter doesn't change array it's called in, it returns new array
            //     return expense.id !== action.id
            // });
             return state.filter(({ id }) =>  id !== action.id); //es6 syntax, destructuring, implicit return
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                   return {
                    ...expense,
                    ...action.updates  //overrriding any properties passed down
                   };
                } else {
                    return expense //same effect as if we didn't do anything
                };
            });
        default:
        return state;
    }
};

//Filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
        return {
            ...state,
            text: action.text
        };
        case 'SORT_BY_AMOUNT':
        return {
            ...state,
            sortBy: 'amount'
        }
        case 'SORT_BY_DATE':
        return {
            ...state,
            sortBy: 'date'
        }
        case 'SET_START_DATE':
        return {
            ...state,
            startDate: action.startDate
        }
        case 'SET_END_DATE':
        return {
            ...state,
            endDate: action.endDate
        }
        default:
        return state;
    }
}

//TIMESTAMPS
//counting in milliseconds, which start at a certain point in time. positive go forward, negative #'s go back
//January 1, 1970 (unix epoch)


//Get visibility expenses
// const getVisibleExpenses = (expenses, filter) => {
//     return expenses;
// };

//^ now with destructuring filter object
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;  //so we don't take into account startDate being undefined
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        let textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {   //return -1 is a should come first, or 1 if be should come first
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

//called any time an action is dispatched
store.subscribe(() => {
    const state = store.getState();
    const visibileExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibileExpenses);

})

//return value from dispatch is action object
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));  //it gets dispatched to both reducers, but we set up cases for reducers that need to do something when add expense gets dispatched
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));  //300 pennies, 3 dollars

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 500 }));  //you can pass id in either way, as object or directly

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

//  store.dispatch(setEndDate(999));



const demoState = {
    expenses: [{
        id: '3p3ej304r3rda',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',  //date or amount
        startDate: undefined,
        endDate: undefined
    }
};



//object spread operator, needed to download a babel spread operator plugin
//yarn add babel-plugin-transform-object-rest-spread, and put in .babelrc plugins array
// const user = {
//     name: 'Jen',
//     age: 24
// };
// console.log({...user});  //{name: "Jen", age: 24}
// console.log({ ...user, location: 'Philadelphia'}); //{name: "Jen", age: 24, location: "Philadelphia"}
// console.log({ ...user, location: 'Philadelphia', age: 27});  //override age - {name: "Jen", age: 27, location: "Philadelphia"}
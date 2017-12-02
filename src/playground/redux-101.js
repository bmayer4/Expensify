import { createStore } from 'redux';   //named export

//Action generators - functions that return action objects
// const incrementCount = () => {
//     return {
//         type: 'INCREMENT'
//     };
// };

//es6 syntax, need parenthesis when implicitly returning objects
//default payload to empty object if no custom data exists, so we aren't trying to access a property of an undefined object (in case we don't have custom data) which would throw an error
// const incrementCount = (payLoad = {}) => ({
//         type: 'INCREMENT',
//         incrementBy: typeof payLoad.incrementBy === 'number' ? payLoad.incrementBy : 1
//     });

//restructuring, pulling incrementBy out of payload object and then setting default value of 1, simpliying code
//how does 1 ever get set? gets set to 1 if object is provided and it doesn't include incrementBy, if no object provided then default is empty object
const incrementCount = ({incrementBy =  1} = {}) => ({ 
        type: 'INCREMENT',
        incrementBy: incrementBy
    });

const decrementCount = ({decrementBy =  1} = {}) => ({ 
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({count} = {}) => ({
    type: 'SET',
    count: count
});

//Reducers
//1. Reducers are pure functions (output only depends on input, or doesn't interact w anything outside its scope)
//2. never change state or action

const countReducer = (state = { count: 0 }, action) => {    //count here is default state value
    console.log('running');
    
    switch (action.type) {
        case 'INCREMENT':
        return {
            count: state.count + action.incrementBy  //DO NOT change state or action, use the values to compute a new state    also, state is current State
        };
        case 'DECREMENT':
        return {
            count: state.count - action.decrementBy
        };
        case 'SET':
        return {
            count: action.count
        };
        case 'RESET':
        return {
            count: 0
        };
        default:
        return state;  //no changes
    }
}


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {  //the return value from subscribe is a function that we can call to unsubscribe
    console.log(store.getState());
});

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

//unsubscribe();

// store.dispatch({
//     type: 'INCREMENTT'  //mispell wouldn't let you know there was an error, which is why below is better
// });

store.dispatch(incrementCount({ incrementBy: 5})); //provide as only argument any custom data 

store.dispatch(incrementCount());

// store.dispatch({
//     type: 'RESET'
// });

store.dispatch(resetCount());

store.dispatch(decrementCount());

// store.dispatch({
//     type: 'DECREMENT'
// });

store.dispatch(decrementCount({ decrementBy: 10}));

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
});

// store.dispatch({  //will force those who use set to provide the value 
//     type: 'SET',
//     count: 101
// });

store.dispatch(setCount({ count: 101 }));



//command line
//yarn add redux




//check this out

// const add = (data) => {
//     return data.a + data.b;
// };

//to destructure arguments
// const add = ({a, b}) => {
//     return a + b;
// };

// console.log(add({a: 1, b: 2}));  //3
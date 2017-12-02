

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

//default export since only one thing we want to get out of the file
export default expensesReducer;
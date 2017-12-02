import uuid from 'uuid';


//ADD EXPENSE (action generator), setting them up as named exports
export const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
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
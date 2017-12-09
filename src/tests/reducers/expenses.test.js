import expensesReducer from './../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });  
    expect(state).toEqual([]);  
})

test('should remove expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
    const state = expensesReducer(expenses, action); 
    expect(state).toEqual([expenses[0], expenses[2]]);  
})

test('should not remove expense if id not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: -1 };
    const state = expensesReducer(expenses, action); 
    expect(state).toEqual(expenses);  
})

test('should add an expense', () => {
    const action = { 
        type: 'ADD_EXPENSE',  
        expense: {
        id: 4343,
        description: 'test expense',
        note: 'test note',
        amount: 0,
        createdAt: 0
    }};
    const state = expensesReducer(expenses, action); 
    expect(state).toEqual([...expenses, action.expense]);  
})

test('should edit expense', () => {
    const description = { description: 'edited description!' }
    const action = { 
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: description
    };
    const state = expensesReducer(expenses, action); 
    expect(state[1].description).toBe(description.description);  
})

test('should not edit expense if expense not found', () => {
    const description = { description: 'edited description!' }
    const action = { 
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: description
    };
    const state = expensesReducer(expenses, action); 
    expect(state).toEqual(expenses);  
})

test('should set expenses', () => {
    const action = { type: 'SET_EXPENSES', expenses: [expenses[1]] };
    const state = expensesReducer(expenses, action); 
    expect(state).toEqual([expenses[1]]);  
});




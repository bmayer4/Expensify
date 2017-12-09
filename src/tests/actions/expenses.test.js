import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from './../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';  //yarn add redux-mock-store
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {  //test data into firebase, our fixture data wasn't in correct format to add to set()
    const expensesData = {};  //done so tests don't run before data is saved to firebase
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description: description, note: note, amount: amount, createdAt: createdAt }
    });
    database.ref('expenses').set(expensesData).then(() => { done(); });
});

//can't use === to compare 2 objects, so need to use toEqual
test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'});
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {note: 'new note value'});
    expect(action).toEqual({type: 'EDIT_EXPENSE', id: '123abc', updates: { note: 'new note value'}});
});

test('should setup the add expense action object with provided values', () => {
    const action = addExpense(expenses[1]);
    expect(action).toEqual({type: 'ADD_EXPENSE', expense: expenses[1] });
});

// test('should setup the add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({type: 'ADD_EXPENSE', expense: { description: '', note: '', amount: 0, createdAt: 0, id: expect.any(String) }} );
// });


test('should add expense to database and store', (done) => {  //done to tell jest to wait for the asyncronous code to finish, point in time when we call done()
    //we need to mock redux store
    const store = createMockStore({});

    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  //promose chaining
    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });;

});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    
        const expenseDefaults = {
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        }
        store.dispatch(startAddExpense({})).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            });
    
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');  //promose chaining
        
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });;
});

test('should set up set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses: expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses: expenses
        });
        done();
});

});



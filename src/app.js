import React from 'react';  
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';    //command line - yarn add react-redux
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';  //this can be named anything 
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';              
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';  //this was in ExpenseForm but we moved it

const store = configureStore();
console.log(store.getState());

//called any time an action is dispatched
store.subscribe(() => {
    const state = store.getState();
    const visibileExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('from subscribe in app.js', visibileExpenses);

});

store.dispatch(addExpense({ description: 'Water bill', amount: 400 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 600, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));








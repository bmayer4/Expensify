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
import './firebase/firebase';


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));








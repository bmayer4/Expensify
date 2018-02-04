import React from 'react';  
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';    //command line - yarn add react-redux
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';  //this can be named anything 
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';              
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';  //this was in ExpenseForm but we moved it
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//if you're in the app and you log in and log out, we don't want to rerender everything
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
        console.log('app rendered');
    }
};

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

//this helps us see if we triggered auth functionaility 
//runs when we visit website
//from firebase docs: For a web application, the default behavior is to persist a user's session even after the user closes the browser. 
firebase.auth().onAuthStateChanged((user) => {  //runs the callback function when auth state is changed
    if (user) {
        console.log('log in');
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else { 
        console.log('log out');
        store.dispatch(logout());
        renderApp();
        history.push('/');  
    }
});












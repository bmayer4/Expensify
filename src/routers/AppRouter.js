import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';  //we will use BrowserRouter once to create the new router, and Route for every page
import React from 'react';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage'; 
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'; 
import HelpPage from '../components/HelpPage'; 
import NotFoundPage from '../components/NotFoundPage'; 
import LoginPage from '../components/LoginPage';   
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';


export const history = createHistory();

    //When react router sees switch, it will move through your route definitions in order and stop when it finds a match    
    const AppRouter = () => (
        <Router history={history}>
        <div>
        <Switch>  
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
        </Switch>
        </div>
        </Router>
    );
    

export default AppRouter;


    //command line adds
//yarn add react-router-dom
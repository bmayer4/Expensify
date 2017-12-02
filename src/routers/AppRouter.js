import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';  //we will use BrowserRouter once to create the new router, and Route for every page
import React from 'react';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage'; 
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'; 
import HelpPage from '../components/HelpPage'; 
import NotFoundPage from '../components/NotFoundPage'; 
import Header from '../components/Header';   


    //When react router sees switch, it will move through your route definitions in order and stop when it finds a match    
    const AppRouter = () => (
        <BrowserRouter>
        <div>
        <Header />
        <Switch>  
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
        </Switch>
        </div>
        </BrowserRouter>
    );
    

export default AppRouter;


    //command line adds
//yarn add react-router-dom
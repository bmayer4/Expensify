import { NavLink } from 'react-router-dom';  
import React from 'react';  


    //exact in "/" because the links use the same matching the our routes use
    //NavLink is same as Link but helps with active styles
    const Header = () => (
        <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        </header>
    );

export default Header;
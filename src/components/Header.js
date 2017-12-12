import { NavLink } from 'react-router-dom';  
import React from 'react';  
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

    //exact in "/" because the links use the same matching the our routes use
    //NavLink is same as Link but helps with active styles
    export const Header = ({ startLogout }) => (
        <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
        </header>
    );

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
    });


//undefined, this component doesn't need mapStateToProps
export default connect(undefined, mapDispatchToProps)(Header);
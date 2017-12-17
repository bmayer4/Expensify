import { Link } from 'react-router-dom';  
import React from 'react';  
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

    //exact in "/" because the links use the same matching the our routes use
    //NavLink is same as Link but helps with active styles
    export const Header = ({ startLogout }) => (
        <header className="header">
        <div className="content-container">
        <div className="header__content">
        <Link className="header__title" to="/dashboard">
        <h1>Expensify</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
        </div>
        </div>
        </header>
    );

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
    });


//undefined, this component doesn't need mapStateToProps
export default connect(undefined, mapDispatchToProps)(Header);



//removed, but kept for reference
//     <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
//import { NavLink } from 'react-router-dom';  
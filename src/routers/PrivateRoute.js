import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

//I believe this is a component, a wrapper around Route         //renaming component to uppercase, passed in as prop from app.js
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
            <Header />
            <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid  //undefined if unauthenticated, or sting value of uid if authenticated, but we want bool so we flip them with !!
});

export default connect(mapStateToProps)(PrivateRoute);
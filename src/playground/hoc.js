//HOC higher order component - a component that (HOC) that renders another component
//Reuse code
//Render hijacking
//Prop manipulation
//Abstract state

import React from 'react';  
import ReactDOM from 'react-dom';

const Info = (props) => (
<div>
<h1>Info</h1>
<p>The info is: {props.info}</p>
</div>
);

//regular function, not a react component, will be called with the component we want to wrap
//we return the hoc
const withAdminWarning = (WrappedComponent) => {
    return (props) => (  
        <div>
        { props.isAdmin && <p>This is private info. Please don't share!</p> }
        <WrappedComponent  {...props}/>
        </div>
        );   
    };

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
        { props.isAuthenticated ? ( <WrappedComponent {...props}/> ) : ( <p>Please log in</p> )}
        </div>
    );
};

//AdminInfo is component
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'));
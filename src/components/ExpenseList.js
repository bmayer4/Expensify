import React from 'react';
import { connect } from 'react-redux';   //connects your component to the redux store
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from './../selectors/expenses';


//Regular unconnected component, the result is we get props we wanted from the store
//exported below as named export for testing purposes, even though default export is used by app
export const ExpenseList = (props) => (
    <div>
    {
        props.expenses.length === 0 ? (<p>No Expenses</p>) : (props.expenses.map((expense) => {
            return (
                <ExpenseListItem 
                key={expense.id}
                    {...expense}  //spreads out all the properties on expense, as props  ex: id={4344}, description={'rara'}
                />
        );
    })) 
    }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
}

//we are exporting hoc
//syntax the way redux API is set up
export default connect(mapStateToProps)(ExpenseList);

//    key={expense.description}
//expense={expense}
import React from 'react';
import { connect } from 'react-redux'; //connects your component to the redux store
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from './../selectors/expenses';

//exported below as named export for testing purposes, even though default export is used by app
const ExpenseList = (props) => (
    <div className="content-container">
    <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
        {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
            <span>No Expenses</span>
        </div>
        ) : (
        props.expenses.map(expense => {
            return (
            <ExpenseListItem
                key={expense.id}
                {...expense} //spreads out all the properties on expense, as props  ex: id={4344}, description={'rara'}
            />
            );
        })
        )}
    </div>
    </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

//we are exporting hoc
//syntax the way redux API is set up
export default connect(mapStateToProps)(ExpenseList);

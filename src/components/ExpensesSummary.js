import React from 'react';  
import { connect } from 'react-redux'; 
import selectExpenses from './../selectors/expenses';
import getExpensesTotal from './../selectors/expenses-total';  
import numeral from 'numeral';
import { Link } from 'react-router-dom';

//export here for test
export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord =  expenseCount === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (

    <div className="page-header">
    <div className="content-container">
    <h1 className="page-header__title">You have <span>{expenseCount}</span> <span>{expenseWord}</span> totaling <span>{formattedExpensesTotal}</span></h1>
    <div className="page-header__actions">
    <Link className="button" to="/create">Add Expense</Link>
    </div>
    </div>
    </div>
    );
};


const mapStateToProps = (state) => {
    //SO, rather than having visibleExpenses as prop, and doing the work there with length and calling getExpensesTotal, it is better for testing to do this so I can pass in props of diff values
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    };
}
export default connect(mapStateToProps)(ExpensesSummary);
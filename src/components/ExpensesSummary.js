import React from 'react';  
import { connect } from 'react-redux'; 
import selectExpenses from './../selectors/expenses';
import getExpensesTotal from './../selectors/expenses-total';  
import numeral from 'numeral';

//export here for test
export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord =  expenseCount === 1 ? 'expenses' : 'expense'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    return (
        <div>
    <p>You have {expenseCount} {expenseWord} totaling {formattedExpensesTotal}</p>
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
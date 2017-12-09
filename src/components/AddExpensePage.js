import React from 'react';  
import { connect } from 'react-redux'; 
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from './../actions/expenses';

//named export (unconnected) for test
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/');  //no page refresh, using browser routing
    };
    render () {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                onSubmit={this.onSubmit}  //no longer define the function inline, which would get recalculated on every render. THIS is why we made this a class based component
                />
            </div>
        );
    }
}





//stateless functional components don't have state, but they do have props
//stateless functional components don't have access to 'this'...so use props.something, while class based components use this.props.something
// const AddExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm 
//         onSubmit={(expense) => {
//             props.onSubmit(expense);
//             props.history.push('/');  //no page refresh, using browser routing
//         }}
//         />
//     </div>
//     );



    //connect takes two arguments, mapStateToProps and mapDispatchToProps
    const mapDispatchToProps = (dispatch) => ({
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
        });


    export default connect(undefined, mapDispatchToProps)(AddExpensePage);
import React from 'react';  
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, editExpense } from './../actions/expenses'; 


export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);  
        this.props.history.push('/');
    };
    onRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit}/>
                <button onClick={this.onRemove}>Remove</button>
            </div>
            );
    }
}

//didn't user es6 syntax, i was using console.log
// const EditExpensePage = (props) => {
//     //console.log(props);
//     return (
//     <div>
//         <ExpenseForm expense={props.expense} onSubmit={(expense) => {
//             props.dispatch(editExpense(props.expense.id, expense));
//             props.history.push('/');
//         }}/>
//         <button onClick={() => {
//             props.dispatch(removeExpense({id: props.expense.id}));
//             props.history.push('/');
//         }}>Remove</button>
//     </div>
//     );
// }

const mapStateToProps = (state, props) => {  //props is needed to use right below
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
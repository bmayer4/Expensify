import React from 'react';  
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, startEditExpense } from './../actions/expenses';
import RemoveExpenseModal from './RemoveExpenseModal'; 


export class EditExpensePage extends React.Component {

    state = {
        modalOpen: undefined
    }

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);  
        this.props.history.push('/');
    };
    onRemove = () => {
        this.setState(() => ({
            modalOpen: false
        }));
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
    };

    removeClicked = () => {
        this.setState(() => ({
            modalOpen: true
        }));
    };


    cancelClicked = () => {
        this.setState(() => ({
            modalOpen: false
        }));
    };

    render() {
        return (
            <div>
            <div className="page-header">
            <div className="content-container">
            <h1 className="page-header__title" >Edit Expense</h1>
            </div>
            </div>
            <div className="content-container">
                <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit}/>
                <button className="button button--secondary" onClick={this.removeClicked}>Remove Expense</button>
            </div>
            <RemoveExpenseModal modalOpen={this.state.modalOpen} onRemove={this.onRemove} onCancel={this.cancelClicked} />
            </div>
            );
    }
}



const mapStateToProps = (state, props) => {  //props is needed to use right below
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

//<button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
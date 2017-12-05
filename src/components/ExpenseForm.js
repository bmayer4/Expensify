import React from 'react';
import moment from 'moment';  //yarn add moment, yard add react-dates, yarn add react-addons-shallow-compare (react-dates relys on this)
import { SingleDatePicker } from 'react-dates';

//had to use constructor() since we needed to access props...BUT couldn't you do that with the es6 syntax? state = {}....?
export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
        console.log(props); 
    }

    // state = {    THIS WORKS...WHY CHANGE TO ABOVE?, i added this in
    //        description: this.props.expense ? this.props.expense.description : '',
    //         note: this.props.expense ? this.props.expense.note : '',
    //         amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    //         createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    //         calendarFocused: false,
    //         error: ''
    // }

      // state = {    THIS IS ORIGINALLY WHAT WAS HERE
    //        description: '',
    //         note: '',
    //         amount: '',
    //         createdAt: moment(),
    //         calendarFocused: false,
    //         error: ''
    // }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description: description
        }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note: note
        }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {  //we cam still set amount to nothing and set state, but submit wom't work. The or is why we need !amount
            this.setState(() => ({
                amount: amount
            }));
        }
    };

    //this gets passed the moment 
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt: createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({   
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10) * 100,  //base 10, and * 100 since we're working in cents
                createdAt: this.state.createdAt.valueOf()
             });
        }
    };

    render() {
        return (
            <div>
            { this.state.error && <p>{this.state.error}</p> }
            <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="description" autoFocus value={this.state.description} onChange={this.onDescriptionChange}/>
            <input type="text" placeholder="amount" value={this.state.amount} onChange={this.onAmountChange} />
            <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false} 
            />
            <textarea  placeholder="Add a note for your expense (optional)" value={this.state.note} onChange={this.onNoteChange} >
            </textarea>
            <button>Add Expense</button>
            </form>
            </div>
        );
    }
};




//moment ex:

// const now = moment();
// console.log(now.format("MMM Do, YYYY"));  //from Moment.js docs
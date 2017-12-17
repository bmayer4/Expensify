import React from 'react';
import { connect } from 'react-redux'; 
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate }  from './../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {  //named export, unconnected, for test
    state = {
        calendarFocused: null   //will be a string startDate for first, or string endDate for second, not boolean like single date picker
    }

    onDatesChange = ( { startDate, endDate }) => {  //gets called by react dates library, with an object, containiong start date and end date. we will destructure
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = ( calendarFocused ) => { 
        this.setState(() => ({ calendarFocused: calendarFocused }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSelectChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount();
        }
     }

    render() {
        return  (
            <div className="content-container">
            <div className="input-group">
            <div className="input-group__item">
             <input type="text" placeholder="Search expenses" className="text-input" value={this.props.filters.text} onChange={this.onTextChange}/>
             </div>
            <div className="input-group__item">
            <select className="select" value={this.props.filters.sortBy} onChange={this.onSelectChange}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            </select>
            </div>
            <div className="input-group__item">
            <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}  //false by default
            numberOfMonths={1}
            isOutsideRange={() => false} 
             />
            </div>
            </div>  
             </div>
        );
    } 
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

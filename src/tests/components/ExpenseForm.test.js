import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from './../fixtures/expenses';
import moment from 'moment';


//*** above will fail when we run test again because a new moment is created for createdAt when no props are passed
//** so we will need to mock the moment library 
test('should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});



test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });  //this is in enzyme docs, simulate events, 'submit' will get the onSubmit prop
    //expect(wrapper.state('error')).toEqual('Please provide description and amount');  //I did this one
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});


test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { target: { value: 'cat' } });
    expect(wrapper.state('description')).toBe('cat');
});

test('should set not on text area change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', { target: { value: 'cat note' } });
    expect(wrapper.state('note')).toBe('cat note');
});

test('should set amount if valid input', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { target: { value: '100.50' } });
    expect(wrapper.state('amount')).toBe('100.50');
});

test('should not set amount if invalid input', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { target: { value: '100.500' } });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[1].description,
        note: expenses[1].note,
        amount: expenses[1].amount,
        createdAt: expenses[1].createdAt,
    });
});



//on date change and on focus change are triggered by passing them down into singe date picker
//spies are from jest
//wrapper/shallow/find/prop, etc is from enzyme

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });  //handler expects object with focused property
    expect(wrapper.state('calendarFocused')).toBe(focused);
});
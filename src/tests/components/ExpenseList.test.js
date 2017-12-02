

//When testing component, we want to test it unconnected
import React from 'react';
import { shallow } from 'enzyme';
import  { ExpenseList } from '../../components/ExpenseList';  //unconnected version, not default connected export
import expenses from '../fixtures/expenses';


test('should render expense list with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense list with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});






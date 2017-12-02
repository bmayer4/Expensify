import React from 'react';
import { shallow } from 'enzyme';
import  ExpenseListItem  from '../../components/ExpenseListItem';  //there is no connected version
import expenses from '../fixtures/expenses';


test('should render ExpenseListItem correctly', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});
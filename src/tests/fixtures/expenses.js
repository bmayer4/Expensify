//fixtures are test/dummy data

import moment from 'moment';

const expenses = [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 195,
    createdAt: 0
},
{
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()   //numbers, but filters startDate and endDate have to be moments for calender to read them
},
{
    id: '3',
    description: 'credit card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

export default expenses;
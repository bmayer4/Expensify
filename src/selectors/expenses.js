import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch =  startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true    //always return true if no start date
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true 
        let textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {   //return -1 is a should come first, or 1 if b should come first
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export default getVisibleExpenses;
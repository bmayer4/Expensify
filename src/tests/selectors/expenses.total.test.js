import getExpensesTotal from '../../selectors/expenses-total';
import expenses from './../fixtures/expenses';

test('should return zero if no expenses', () => {
    const result = getExpensesTotal([]);  //expenses state is default is []
    expect(result).toBe(0);
});

test('should add up a single expense total', () => {
    const result = getExpensesTotal([expenses[0]]);  //must be array of 1 object
    expect(result).toBe(195);
});

test('should add up multiple expenses total', () => {
    const result = getExpensesTotal(expenses);
    expect(result).toBe(114195);
});

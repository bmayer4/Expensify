
const getExpensesTotal = (expenses) => {

    //I can use es6 syntac for implicit return, see below commented out
    return expenses.map((expense) => {
        return expense.amount
    }).reduce((sum, value) => {
        return sum + value;
    }, 0);
    
}

export default getExpensesTotal;
  


//look above how I can chain
// const getExpensesTotal = (expenses) => {

//         if (expenses.length === 0) {
//             return 0
//         }
    
//         const amounts = expenses.map((expense) => {
//             return expense.amount
//         });
    
//         return amounts.reduce((sum, value) => {
//             return sum + value;
//         });
        
//     }
    
//     export default getExpensesTotal;
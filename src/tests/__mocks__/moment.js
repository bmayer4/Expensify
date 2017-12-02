const moment = require.requireActual('moment');

export default (timeStamp = 0) => {
    return moment(timeStamp);
};

//this is going to be the function that we call inside the mocked moment library
//when moment() is called in test file, we will use the mocked version of the library
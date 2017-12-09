const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('no success')
    }, 3000);
        
});

//we usually won't create a promise, they will be created by the library we are using
//promise can only be resolved or rejected, and only once, and you can only pass in a single value (can be object)

console.log('before');

promise.then((data) => {
    console.log(data);
}).then(() => {
    console.log('promise chaining, this runs if promise is resolved, but no data unless we return a promise from previous function');
}).catch((error) => {  //we can call error anything we want
    console.log(error);  //instead of catch, we could use second function which is reject (see *)
});

console.log('after');

//*
// promise.then((data) => {
//     console.log(data);
// }, ((error) => {
//     console.log(error);
// }));
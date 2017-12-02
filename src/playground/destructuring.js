//Object destructuring

const person = {
    name: 'Brett',
    age: 32,
    location: {
        city: 'Jupiter',
        temp: 70
    }
};

console.log(`${person.name} is ${person.age} years old`);

//destructuring allows us to take objects and to pull their properties into variables

const { name = 'Anonymous', age } = person;  //name has default if no name is provided, prevents undefined
console.log(`${name} is ${age} years old`);

if (person.location.city && person.location.temp) {
    console.log(`It is ${person.location.temp} in ${person.location.city}`);
}


//for nested properties, syntax for renaming temp 
const { city, temp: temperature } = person.location;

if (city && temperature) {
    console.log(`It is ${temperature} in ${city}`); 
}
 


//challenge
// const book = {
//     name: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName  = 'Self-Published'} = book.publisher;
// console.log(publisherName);  //Penguin or Self-Published as default, also with renamed variable





//Array destructuring

const address = ['16261 Mellen Ln', 'Jupiter', 'FL', '33458'];
console.log(`you are in ${address[1]}, ${address[2]}`);

const [street, cit, , zip = '33477'] = address;  //var names are matched up by position, comma skips, default value for zip or 4th item
console.log(street);
console.log(zip);

//for challenge
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [drink, , mediumPrice] = item;
console.log(`A medium ${drink} costs ${mediumPrice}`);



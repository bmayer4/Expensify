class Person {
    constructor(name = "Anonymous", age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
       return `Hello ${this.name}`;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old!`;
     }
}

const me = new Person('Brett', 32);
console.log(me.name);
console.log(me.getGreeting());
console.log(me.age);
console.log(me.getDescription());


const someone = new Person();
console.log(someone.name);
console.log(someone.getGreeting());
console.log(someone.age);


class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return this.major;  //logical not operator
    }
    //override parent method
    getDescription()  {
        let description = super.getDescription();
        if (this.hasMajor()) {
        description += ` My major is ${this.major}`;
        }
        return description
    }
}

const oscar = new Student('Oscar', 5, 'Meowematics.');
console.log(oscar.major);
console.log(oscar.hasMajor());
console.log(oscar.getDescription());


//challenge
class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }
    hasHomeLocation() {
        return !!this.homeLocation;  //logical not operator
    }
    //override parent method
    getGreeting()  {
        let greeting = super.getGreeting();
        if (this.hasHomeLocation()) {
            greeting += `. You are out of ${this.homeLocation}`;
        }
       return greeting;
    }
}

const chelsi = new Traveler('Chelsi', '28', 'Canton, GA');
console.log(chelsi.getDescription());
console.log(chelsi.getGreeting());


const interestingPerson = new Traveler(undefined, undefined, 'Nowhere');
console.log(interestingPerson.getGreeting());













//--------------------
//below is great notes on new class syntax

class OldSyntax {
    constructor() {
        this.name = 'Brett';
        this.getGreeting = this.getGreeting.bind(this);  //this because we broke the this binding when referencing function
    }
    getGreeting() {
        return `Hi, my name is ${this.name}`;
    }
}

const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());  //won't work unless we use this.getGreeting = this.getGreeting.bind(this);





// -----------------

class NewSyntax {  //now we don't have to set up the constructor function, we will do this in our class based components
    name = "Brett";
    getGreeting = () => {          //arrow functions don't have their own this binding, they use this of parents scope, for classes that is the class instance
        return `Hi, my name is ${this.name}`;
    }
}

const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting;
console.log(newSyntax);
console.log(newGetGreeting());  //works!

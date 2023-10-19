const x = {
    name: "John",
    age: 30,
    isMarried: false,
    sayHi: function () {
        console.log("Hi");
    }
}

console.log(x.name);
console.log(x.age);
console.log(x.isMarried);
x.sayHi();
console.log(x);
console.log(x.sayHi);

console.log("========================================");

let firstName = "John";
let lastName = "Smith";

let text = `Hello ${firstName} ${lastName}!`;
console.log(text);

console.log("========================================");

const person1 = {
    name: "John",
    surname: "Smith",
    fullName: function () {
        return this.name + " Smith";
    }
}

const person2 = {
    name: "Mary",
    surname: "Doe"
}
console.log(person1.fullName.call(person2));
console.log(person1.fullName.bind(person2));

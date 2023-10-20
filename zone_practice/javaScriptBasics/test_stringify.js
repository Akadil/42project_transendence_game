const person = {
    name: "John",
    age: 30,
    city: "New York",
    date: new Date(),
    getName: function () { return this.name; }
    // getNameStringified: this.getName.toString()
};

let myString = JSON.stringify(person);
console.log(myString); // {"name":"John","age":30,"city":"New York"}
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}

const myFather = new Person("John", "Doe", 50, "blue");

console.log(myFather);
myFather.nationality = "English";
console.log(myFather);

/*  This will not have afferct at all */
Person.nationality = "English";
const myMother = new Person("Sally", "Rally", 48, "green", "French");
console.log(myMother);


/**
 * This method has an affect, but not direct. It doesn't change the 
 * structure of the object, but if you added some property, you can access
 * it later
 */
Person.prototype.nationality = "English";
console.log(Person.toString());
const myBrother = new Person("Francois", "Serve", 24, "blue", "French");
console.log(myBrother);
console.log(myBrother.nationality);

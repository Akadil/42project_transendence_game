const myArray = [1, 2, 3, 4, 5];
const myString = "Hello World!";

/**
 * Results: In general, it is not crashing, but it gives some weird results.
 *          "for of" is working as expected. If there is some type, it iterates
 *          through subtypes. 
 * 
 *          "for in" is not working as expected. It is iterating through the
 *          array, but it is not iterating through the string. It is iterating
 *          through indices of the string.
 */

/*  ************************************************************************* */
/*  Test the for in operations  */
/*  ************************************************************************* */

console.log("=====Test the for in operations=====");

console.log("Test the for in operation on an array");
for (let i in myArray) {
    console.log(i);
}

console.log("Test the for in operation on a string");
for (let i in myString) {
    console.log(i);
}

/*  ************************************************************************* */
/*  Test the for of operations  */
/*  ************************************************************************* */

console.log("=====Test the for of operations=====");

console.log("Test the for of operation on an array");
for (let i of myArray) {
    console.log(i);
}

console.log("Test the for of operation on a string");
for (let i of myString) {
    console.log(i);
}

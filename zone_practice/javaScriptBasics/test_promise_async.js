/**
 * @brief   Damn that is harder topics that I thought
 */

async function myFunction() {
    let num = Math.random();

    if (num < 0.9) {
        console.log("I was in Success section");
        Promise.resolve("Success: Less thatn 0.9");
    } else {
        console.log("I was in Failure section");
        Promise.reject("Failed: Greater than 0.9");
    }
}

myFunction().then(
    function (value) { console.log(value); },
).catch(
    function (error) { console.log(error); }
);

/**
 * @brief   myResolve and myReject are just function names
 *          If everything goes well, call myResolve() with some data inside
 *          If something goes wrong, call myReject() with some error inside
 * 
 *          What can possibly happen?
 *              1. The page is not fully loaded
 *              2. The sql database is down
 *              3. The user input is wrong
 *              4. and etc
 * 
 * @param {*} some 
 */

function myDisplayer(some) {
    console.log(some);
};

let myPromise = new Promise(function (myResolve, myReject) {
    let x = 0;

    if (x == 0) {
        myResolve("OK");
    } else {
        myReject("Error");
    }
});

myPromise.then(
    function (value) { myDisplayer(value); },
).catch(
    function (error) { myDisplayer(error); }
);

/**
 * @brief   Test the behavior of the return statement inside a setInterval
 *
 * @result  The return statement is ignored :(
 */
function test_intervalBehavior() {
    let i = 0;

    setInterval(() => {
        i++;
        console.log('I was here!');
        return i;
    });
    return -1;
}

console.log('My value is ' + test_intervalBehavior());

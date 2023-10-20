let myLoop = setInterval(myFunction, 1000);

function myFunction() {
    let d = new Date();
    console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());

    if (d.getSeconds() === 20) {
        console.log("Stop the interval");
        clearInterval(myLoop);
    }
}

console.log("Hello World!");
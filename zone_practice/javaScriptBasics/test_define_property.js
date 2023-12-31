const obj = { counter: 0 };

Object.defineProperty(obj, "reset", {
    get: function () { this.counter = 0; }
});

Object.defineProperty(obj, "increment", {
    get: function () { this.counter++; }
});

Object.defineProperty(obj, "decrement", {
    get: function () { this.counter--; }
});

Object.defineProperty(obj, "add", {
    set: function (value) { this.counter += value; }
});

Object.defineProperty(obj, "subtract", {
    set: function (value) { this.counter -= value; }
});

console.log(obj.counter); // 0
obj.add = 5;
obj.subtract = 1;
console.log(obj.counter); // 0
obj.reset;
console.log(obj.counter); // 0


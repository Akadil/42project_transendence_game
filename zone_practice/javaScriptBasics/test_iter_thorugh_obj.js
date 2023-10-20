const person = {
    fname: " John",
    lname: " Doe",
    age: 25
};

let text = "";
let txt = "";
for (let x in person) {
    text += x + ' ';
    txt += person[x];
}

console.log(text); // fnamelnameage
console.log(txt); // John Doe 25

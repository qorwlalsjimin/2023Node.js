let {text_odd, text_even} = require('./moduleText');
let checkOddOrEven = require('./moduleFunc');

function checkStringOddOrEven(str){
    if(str.length%2)
        return text_odd;
    else
        return text_even;
}

console.log("useModule: ", checkOddOrEven(10));
console.log("useModule: ", checkStringOddOrEven('Hello'));

module.exports = [checkStringOddOrEven, checkOddOrEven, text_odd, text_even];
const {text_odd, text_even} = require("./moduleText");
const checkNumberFunc = require("./moduleFunc");

function checkStringOddOrEven(str){
    if(str.length % 2){
        return text_odd;
    }
    return text_even;
}
console.log("useModule: ", checkNumberFunc(10));
console.log("useModule: ", checkStringOddOrEven('Hello'));

module.exports = [checkStringOddOrEven, checkNumberFunc, text_odd, text_even];
const {text_odd, text_even}
    = require("./moduleText");

function checkOddOrEven(num){
    if(num % 2){
        return text_odd;
    }
    return text_even;
}
module.exports = checkOddOrEven;
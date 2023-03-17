const text_odd = "홀수입니다";
const text_even = "짝수입니다";

console.log("1: ", exports === module.exports);
console.log("2: ", exports, module.exports);

module.exports = {
    text_odd, //text_odd: text_odd
    text_even,
}

exports.text_odd = text_odd;
exports.text_even = text_even;
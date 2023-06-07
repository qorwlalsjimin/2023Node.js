const A = require("./globalA");

console.log(A());

globalThis.message = "안녕하세요";
console.log(A());
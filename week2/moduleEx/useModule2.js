const [check_str_OE, check_num, tx_odd, tx_even] = require('./useModule');
//배열이기 때문에 이름 변경 가능

console.log("useModule2: ", check_str_OE('hello!'));
console.log("useModule2: ", check_num(5));
console.log("useModule2: ", tx_odd);
console.log("useModule2: ", tx_even);
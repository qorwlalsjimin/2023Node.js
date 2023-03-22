//동기 방식으로 바꾸기

const fs = require('fs');

let readData = "읽어오지 못했습니다";

let data = fs.readFileSync("./readText.txt");
console.log(data?.toString());
readData = data?.toString();


let data2 = fs.writeFileSync("./writeText.txt", ("읽어온 데이터2: "+readData));
console.log("data2: "+data2); //undefined 나옴

let data3 = fs.readFileSync("./writeText.txt");
console.log(data3?.toString()); //오류가 나면 toString()이랑 만나서 프로그램이 멈추지 않음
readData = data3?.toString();
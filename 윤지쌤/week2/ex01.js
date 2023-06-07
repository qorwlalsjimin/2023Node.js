//JSON문자열 형식을 객체로 바꾸기
const jsonData = '{"result":true, "number":42}';
const obj = JSON.parse(jsonData);

console.log(obj.number);
console.log(obj.result);

//값 혹은 객체를 JSON형태의 문자열로 변경
console.log(JSON.stringify({x:4, y:2, result: true}));
console.log(typeof JSON.stringify({x:4, y:2, result: true})); //string
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj.count);
console.log(obj.result);

console.log(JSON.stringify({x:5, y:6})); //값 또는 객체를 JSON 형태의 문자열로
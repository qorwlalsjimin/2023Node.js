console.time('시간 측정');
console.timeEnd('시간 측정');

console.log("평범한 로그", "여러 값 가능");
console.log("에러 메시지를 출력할 때");

const obj = {
    aa:{
        bb:{
            key : "value"
        }
    }
};

console.dir(obj, {colors:false, depth:2});
console.dir(obj, {colors:true, depth:1});
//depth의 기본값 2

console.log(__filename);
console.log(__dirname);
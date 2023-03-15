//구조분해 할당

const example = {a:123, b:{c:11, d:16}};

//case1:
// const a = example.a;
// const d = example.b.d;

//case2:
const {a, b:{d}} = example;

/*배열*/
arr = [1,2,3,4,5];

//case1:
// const x = arr[0];
// const y = arr[2];
// const z = arr[4];

//case2:
const [x,,y,,z] = arr;

console.log(a,d);
console.log(x,y,z);
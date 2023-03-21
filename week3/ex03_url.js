const { URL } = require('url');
const myURL = new URL('https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=313193984&start=we');
console.log('new URL():', myURL);
console.log('searchParams:', myURL.searchParams); //searchParams 객체
console.log('searchParams.getAll():', myURL.searchParams.getAll('start')); //키에 해당하는 모든 값들을 가져옵니다. 
console.log('searchParams.get():', myURL.searchParams.get('ItemId')); //키에 해당하는 첫 번째 값만 가져옵니다.
console.log('searchParams.has():', myURL.searchParams.has('ItemId')); //해당 키가 있는지 없는지를 검사합니다.
console.log('searchParams.has():', myURL.searchParams.has('page')); 
console.log('searchParams.keys():', myURL.searchParams.keys());//searchParams의 모든 키를 반복기(iterator, ES2015 문법) 객체로 가져옵니다.
console.log('searchParams.values():', myURL.searchParams.values()); //searchParams의 모든 값을 반복기 객체로 가져옵니다.
myURL.searchParams.append('filter','ex1');//해당 키를 추가합니다. 같은 키의 값이 있다면 유지하고 하나 더 추가합니다.
myURL.searchParams.append('filter','ex2'); 
console.log(myURL.searchParams.getAll('filter'));
console.log('searchParams:', myURL.searchParams);
myURL.searchParams.set('filter','ex3'); // append와 비슷하지만 같은 키의 값들을 모두 지우고 새로추가합니다.
myURL.searchParams.set('filter','ex4'); 
console.log(myURL.searchParams.getAll('filter')); 
myURL.searchParams.append('filter','ex5'); 
console.log(myURL.searchParams.getAll('filter')); 
myURL.searchParams.delete('filter'); //해당 키를 제거합니다.
console.log(myURL.searchParams.getAll('filter'));


console.log('searchParams.toString():', myURL.searchParams.toString()); //조작한 searchParams 객체를 다시 문자열로 만듭니다. 
myURL.search = myURL.searchParams.toString(); // search에 대입하면 주소 객체에 반영됩니다.
//require() 메서드는 exports 객체를 리턴함
var user = require('./user4');

function showUser(){
    return user().name + ','+'No Group';
}

console.log('사용자 정보: %s', showUser());
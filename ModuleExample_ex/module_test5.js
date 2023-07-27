//require() 메서드는 exports 객체를 리턴함
var user = require('./user5');

function showUser(){
    return user.getUser().name + ','+user.group.name;
}

console.log('사용자 정보: %s', showUser());
//exports 객체 속성으로 함수 추가
var user = {
    getUser: function(){
        return {id: 'test01', name: '소녀시대'};
    },
    group: {id:'group01', name:'친구'}
}

module.exports = user;
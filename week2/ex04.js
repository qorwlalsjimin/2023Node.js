//화살표 함수 this

const relationship1 = {
    name : "one",
    friends: ["hi", "hello", "bye"],
    logFriends: function(){
        //relationship1을 가리키는 this를 that에 저장
        var that = this; //this는 함수 자체를 의미: relationship
        
        this.friends.forEach(function(friend){ //여기서 this는 function(freind)
            console.log(that.name, friend);
        });
    }
}

relationship1.logFriends();


console.log("--------");
const relationship2 = {
    name : "one",
    friends: ["hi", "hello", "bye"],
    logFriends: function(){
        this.friends.forEach((friend)=>{ //화살표 함수를 하면 밖의 this로 유지됨
            console.log(this.name, friend);
        });
    }
}

relationship2.logFriends();
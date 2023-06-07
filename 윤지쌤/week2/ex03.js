//setTimeout(함수, 지연시간[밀리초])
//1000초 1초

setTimeout(()=>console.log("5초 경과"), 5000);
setTimeout(func_twoSec, 2000);

function func_twoSec(){
    console.log("2초 경과");
}

//2초마다 난수가 출력
const ineterval_random = setInterval(()=>console.log(Math.floor(Math.random()*10)), 2000);
setTimeout(() =>{
    console.log("10초 경과");
    clearInterval(ineterval_random);
}, 10000);
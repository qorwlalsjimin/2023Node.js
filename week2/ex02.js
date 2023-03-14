//callback 함수
//- argument(전달인자)로 넘겨받는 함수
//- 외부함수에 의해서 호출되는 함수
//- 비동기처리에 유용

function func_callback(){
    console.log("콜백함수 실행");
}
function func_one(callback){
    console.log("함수 실행");
    callback();
}
func_one(func_callback);
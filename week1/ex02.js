//일반형
// - (매개변수) => {함수코드}

func_arrow1 = (str) => {
    return "출력1 : "+ str;
};


//매개변수가 하나일때는 () 생략 가능
// - 매개변수 => {함수코드}
func_arrow2 = str => {
    return "출력2 : "+str;
};


//함수코드가 return문 하나일 경우 괄호 및 return 생략 가능
// - 매개변수 => 반환값
func_arrow3 = str => "출력3 : "+str;
console.log(func_arrow1('fa1'));
console.log(func_arrow2('fa2'));
console.log(func_arrow3('fa3'));

/*
arrow function과 function는 this 차이점이 있으므로,
그대로 대체할 수는 없다
*/
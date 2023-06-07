const path = require('path');
const string = __filename;
console.log('path.sep:', path.sep);     //경로의 구분자. Window는 \ 리눅스는 /
console.log('path.delimiter:', path.delimiter); //환경 변수의 구분자입니다. 
//process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있습니다. Windows는 세미콜론(;)이고 POSIX는 콜론(:)
console.log('------------------------------');
console.log('path.dirname():', path.dirname(string)); //파일이 위치한 폴더 경로
console.log('path.extname():', path.extname(string)); //파일의 확장자
console.log('path.basename():', path.basename(string)); //파일의 이름(확장자 포함)을 보여줍니다. 
//파일의 이름만 표시하고 싶다면 basename의 두 번째 인자로 파일의 확장자를 넣어주면 됩니다.
console.log('path.basename():', path.basename(string, path.extname(string)));
console.log('------------------------------');
console.log('path.parse()', path.parse(string));//파일 경로를 root, dir, base, ext, name으로 분리
console.log('path.format():', path.format({ //path.parse()한 객체를 파일 경로로 합칩니다.
    dir: 'C:\\users\\yoon',
    name: 'path',
    ext: '.js',
})); //


console.log('path.normalize():', path.normalize('C://users\\\\yoon\\\path.js'));
//   /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환해줍니다.


console.log('------------------------------');
//파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려줍니다.
console.log('path.isAbsolute():', path.isAbsolute('C:\\')); 
console.log('path.isAbsolute():', path.isAbsolute('./home'));

console.log('------------------------------');
// 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줍니다.
console.log('path.relative():', path.relative('C:\\users\\yoon\\path.js', 'C:\\'
));
//여러 인자를 넣으면 하나의 경로로 합쳐줍니다. 
//상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리해줍니다
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/yoon')); 

// resolve에서는 /를 만나면 절대경로로 인식된다. join은 상대경로로 생각해 무시한다.
console.log('path.resolve1():', path.resolve(__dirname, '..', 'users', '.', 'yoon'));
console.log('path.resolve2():', path.resolve(__dirname, '..', 'users', '.', '/yoon'));

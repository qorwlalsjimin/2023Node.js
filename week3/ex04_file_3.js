//promise로 fs해보기

const { readFile } = require('fs');

const fs = require('fs').promises

let readData = "읽어오지 못했습니다";

fs.readFile("./readText.txt")
    .then((data)=>{
        console.log(data.toString());
        readData = data.toString();
        return fs.writeFile("./writeText3.txt",("텍스트3: "+readData));
    })
    .then(()=>{
        return fs.readFile("./writeText3.txt");
    })
    .then((data3)=>{
        console.log("data3: ", data3.toString());
    })
    .catch((err)=>{
        console.error(err);
    })
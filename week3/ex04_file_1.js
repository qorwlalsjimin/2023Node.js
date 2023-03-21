const fs = require('fs');
let readDate = "읽어오지 못했습니다.";
fs.readFile("./readText.txt", (err, data) => {
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
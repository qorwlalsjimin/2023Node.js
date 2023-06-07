const cathy = {
    "name": "cathy",
    "age": 19,
    "skills": ["자바스크립트", "파이썬", "코볼"]
};

console.log(cathy);

cathy.city = "Seoul";
console.log(cathy);

console.log(cathy.name);
console.log(cathy["name"]);

delete cathy.city;
console.log(cathy);
'use strict'; 
var countDown=new Date("DEC 31, 2023 23:59:59").getTime();
    var x= setInterval(function(){
    var now=new Date().getTime();
    var distance=countDown-now;
    
    var days=Math.floor(distance/(1000*60*60*24));
    var hours=Math.floor((distance %(1000*60*60*24))/ (1000*60*60));
    var minutes = Math.floor((distance %(1000*60*60))/ (1000*60));
    var seconds = Math.floor((distance %(1000*60))/ 1000);

document.getElementById("count").innerHTML 
= "<font color=#ff0000 size=5><b>"
+days+"</b></font>일&nbsp;<font  color=#ffffff size=5>"
+hours+"</font>시간&nbsp;<font color=#ffffff size=5 >"
+minutes+"</font>분&nbsp;<font color=#ffffff size=5 >"
+seconds+"</font>초";
 if(distance<0){
     clearInterval(x);
     document.getElementById("count").innerHTML="카운트 다운 종료"
 } 
},1000);
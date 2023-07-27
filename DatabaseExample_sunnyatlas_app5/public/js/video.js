var myVideo = document.getElementById("video1"); 

function playPause() { 
  if (myVideo.paused) 
        myVideo.play(); 
    else 
        myVideo.pause(); 
} 

function makeBig() { 
    myVideo.width = 300; 
} 

function makeSmall() { 
    myVideo.width = 200; 
} 

function makeNormal() { 
    myVideo.width = 250; 
}
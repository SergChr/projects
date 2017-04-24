window.onload = function () {

    window.addEventListener("keydown", function (e) {
       var audio = document.querySelector("audio[data-key='" + e.keyCode + "']"); //find audio element
       var tab = document.querySelector(".tab[data-key='" + e.keyCode + "']");

        if (!audio) return; //exit from function, if audio element not found

        audio.currentTime = 0; // to clean rest of .wav sample to play multiple times
        audio.play();
        
        tab.classList.add('playing');
    });

    const tabs = document.querySelectorAll(".tab");
    function removeTransition(e) {
        if(e.propertyName !== 'transform') return;
        this.classList.remove("playing");
    }
    tabs.forEach(tab => tab.addEventListener("transitionend", removeTransition));
    
    
    var main = document.querySelector(".main"),
   mainHeight = main.clientHeight;
   
    main.style.height = mainHeight+10+"px";
}
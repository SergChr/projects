window.onload = function () {

    var secondArrow = document.querySelector(".second")
        , minuteArrow = document.querySelector(".minute")
        , hourArrow = document.querySelector(".hour");

    function setDate() {
        var now = new Date()
            , seconds = now.getSeconds()
            , minutes = now.getMinutes()
            , hours = now.getHours()
            , secondsDegrees = ((seconds / 60) * 360) + 90
            , minDegrees = ((minutes / 60) * 360) + 90
            , hourDegrees = ((hours / 60) * 360) + 90;

        secondArrow.style.transform = "rotate(" + secondsDegrees + "deg)";
        minuteArrow.style.transform = "rotate(" + minDegrees + "deg)";
        hourArrow.style.transform = "rotate(" + hourDegrees + "deg)";


    }

    setInterval(setDate, 1000);

}
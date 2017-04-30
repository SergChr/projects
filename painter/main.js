window.onload = function () {

    const canvas = document.getElementById('painter');
    let rangeInp = document.querySelector(".range")
        , colorInp = document.querySelector(".color")
        , colorCircles = document.querySelectorAll(".choose"),
        clearBut = document.querySelector(".clear");


    if (canvas.getContext) { //if canvas doesn't support. Hello, IE
        var ctx = canvas.getContext('2d'); // need to be global for functions below 'if'

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.strokeStyle = "#000"; // default color (black)
        ctx.lineJoin = "round"; //when !'round' it will not desirable line
        ctx.lineCap = "round"; 

        let isDrawing = false; //define that mouse button is not clicked now
        let X, Y; //coords, define them below

        function draw(e) {
            if (!isDrawing) return;
            ctx.beginPath(); //start line path
            ctx.moveTo(X, Y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [X, Y] = [e.offsetX, e.offsetY]; //define coords
        }
        
        clearBut.onclick = function() {  // Clear button
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }


        canvas.addEventListener("mousemove", draw); // draw, when mousemove
        canvas.addEventListener("mousedown", (e) => {
            isDrawing = true; // can draw, if this variable 'true'
            [X, Y] = [e.offsetX, e.offsetY]; //update coordinates of cursor
            document.body.style.cursor = "pointer"; //change cursor, when draw
        }); // click mouse button

        canvas.addEventListener("mouseup", () => { //stop draw
            isDrawing = false;
            document.body.style.cursor = "default"; //default cursor
        }); //escape button

        canvas.addEventListener("mouseout", () => isDrawing = false);

    } else { //if canvas element doesn't support
        document.body.innerHTML = "Your browser doesn't support canvas. Paint your PC in green and throw out on grass or just change browser."
    }

    rangeInp.addEventListener("change", changeLineWidth); //if change rangeInp el.
    colorInp.addEventListener("change", changeColor);

    colorCircles.forEach(function (circle) { //colorCircles is array of 6 circles elements
        //  addEventListener("click", changeColor);
        circle.onclick = function () { // when click on each circle
            changeColor(this.getAttribute("value")); //send value to fn.
        }
    });

    function changeLineWidth() { //change width of draw line
        ctx.lineWidth = rangeInp.value; //default = 5
    }

    function changeColor(value) {

        if (typeof value !== "object") {
            ctx.strokeStyle = value;
            colorInp.value = value;
        } else {
            ctx.strokeStyle = colorInp.value; //if 'value' isn't event (not defined by circle.click),
            //I just change the drawing line width
        }
    }
 //end changeColor fn.
}; //end window.onload fn.
// Sergiy Cheredko(c)
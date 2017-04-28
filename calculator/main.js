window.onload = function () {

    var output = document.querySelector('.output')
        , buttons = document.querySelectorAll('button') // all buttons




    
    , temp = '' // temporary variable for save values




    
    , method; // plus, minus, dividing, or multiplying





    buttons.forEach(function (but) { // for each button attach event 'onclick'

        but.onclick = function () {

                output.innerHTML = ''; // clean 'zero' on start

                temp += but.value; // write value to temporary variable
                output.innerHTML += temp; // show to output

                var a = temp.split(" ")[0] // first num                
                    
                    , method = temp.split(" ")[1] // +, -, * or \                
                    
                    , b = temp.split(" ")[2]; // second number





                if (this.classList.contains("x")) { // multiply
                    if (a && b) { // if var a and b are DEFINED
                        temp = equal("mult") + " * ";
                        output.innerHTML = temp;
                    }
                }

                if (this.classList.contains("c")) { // clear output field
                    temp = '';
                    output.innerHTML = '0';
                }

                if (this.classList.contains("divide")) {
                    if (a && b) {
                        temp = equal("div") + " ÷ ";
                        output.innerHTML = temp;
                    }
                }

                if (this.classList.contains("minus")) {
                    if (a && b) {
                        temp = equal("minus") + " - ";
                        output.innerHTML = temp;
                    }
                }

                if (this.classList.contains("plus")) {
                    if (a && b) {
                        temp = equal("plus") + " + ";
                        output.innerHTML = temp;
                    }
                }

                // SIN, COS, TAN methods
                if (this.classList.contains("sin")) {
                    console.log('sin click');
                    console.log(a);
                    temp = Math.sin(+a);
                    output.innerHTML = temp;
                }

                if (this.classList.contains("cos")) {
                    temp = Math.cos(+a);
                    output.innerHTML = temp;
                }

                if (this.classList.contains("tan")) {
                    temp = Math.tan(+a);
                    output.innerHTML = temp;
                }
                ////
                document.querySelector(".equal").onclick = function () { // '=' button onlick
                    temp = equal(method);
                    output.innerHTML = temp;
                }

                function equal(method) {
                    if (method == 'mult' || method == "*") {
                        return a * b;
                    } else if (method == 'div' || method == "÷") {
                        return a / b;
                    } else if (method == 'plus' || method == "+") {
                        return Number(a) + Number(b); // need to transform string type to number
                    } else if (method == 'minus' || method == "-") {
                        return a - b;
                    }
                }

            } //end onclick fn


    }); // end forEach



}
'use strict';

window.onload = function () {

        var i_uppers = document.getElementById('uppercase'), //  inputs 
            i_numbers = document.getElementById('numbers'), // checkboxes
            i_specials = document.getElementById('specials'), // here
            i_superSpecials = document.getElementById('rarespecials')
            , i_paranoik = document.getElementById('paranoik'),

            generateButton = document.getElementById('button')
            , resultArea = document.getElementById('result')
            , copyButton = document.getElementById('copy')
            , tomd5Button = document.getElementById('toMD5');

        var pass = new Password(); // from generator.js

        // function generate() in class Password():
        // generate(length, isUpperLetters, isNumbers, isSpecialChars, isSuperSpecials, isParanoik) {...}
        // ok, now I don't forget arguments



        generateButton.onclick = function () {

                        
                var lengthPass = +document.getElementById('length').value; // on every 'generate' button click 
                // take a length of #length element

                if (Number.isInteger(+lengthPass)) {
                    resultArea.value = pass.generate(lengthPass, i_uppers.checked, i_numbers.checked, i_specials.checked, i_superSpecials.checked, i_paranoik.checked);
                }
            
            // Show time to hack below green block
            { // Temporary scope block for let variables
               
                let a, result = ``, word;
            let evalTimeBlock = document.querySelector(".evalTime");
            evalTimeBlock.style.visibility = "visible";
            document.querySelector(".evalBlock").style.visibility = "visible";
                
            let hackingTime = pass.evalTime(lengthPass, i_uppers.checked, i_numbers.checked, i_specials.checked, i_superSpecials.checked, i_paranoik.checked);
            
                 
          
            for(var i = 0; i<hackingTime.length; i++) {
                if(+hackingTime[i] != 0) {
                    a = i;
                }
                
                if(i == 5) {
                        word = "years";
                    }
                     if(i == 4) {
                        word = "months";
                    }
                     if(i == 3) {
                        word = "days";
                    }
                     if(i == 2) {
                        word = "hours";
                    }
                     if(i == 1) {
                        word = "minutes";
                    }
                     if(i == 0) {
                        word = "seconds";
                    }
                
                if(hackingTime[5] > 10e30) {
                    result = `Infinity`;
                } else if(hackingTime[0] < 1) {
                   result = `Milliseconds....` ;
                } else {
                     result += ` ${word} ${hackingTime[i]} `;
                }
                
                 
                   
                
            }
                                
            evalTimeBlock.innerHTML = result.split(" ").reverse().join(" ");
            } // END temp. scope block

            } // END of generateButton click

        document.getElementById("length").onkeyup = function () { // input "Length password"
            if (!Number.isInteger(+document.getElementById("length").value)) {
                document.querySelector(".error").style.visibility = "visible";   //show 'Only integers'
            } else {
                document.querySelector(".error").style.visibility = "hidden";
            }
        }

        copyButton.onclick = function () {       
            copyToClipboard(resultArea.value);
        }

        tomd5Button.onclick = function () {
            resultArea.value = `Password:  ${resultArea.value} \n\nMD5:   ${md5(resultArea.value)}`;
        }

        function copyToClipboard(text) {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }

        Number.isInteger = Number.isInteger || function (value) {
            return typeof value === 'number' && Number.isFinite(value) && !(value % 1);
        };
    setInterval(function() {
        document.querySelector(".randomCode").innerHTML = pass.generate(40, 1, 1);
    },150)

    } // END window.onload
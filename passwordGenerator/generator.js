'use strict';
var length = 8
    , isUpperLetters = false
    , isNumbers = false
    , isSpecialChars = false
    , alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    , numbers = '1234567890'.split('')
    , specials = '~!@#$%^&*()_+?}{═'
    , superSpecials = `√∫∂∑∏&±×·∗÷⊗⊕∈∉∩∪⊂⊃⊆⊇∅∃∀⇐⇒⇑⇓⇔∇ℵℑ℘ℜ♚♛♜♝♞♟¢€¥£¤★☭♪☂☠☛▌▄■▀▐`
    , paranoikSpecials = `ɱɳɲŋʈɖɟɢʔɨʉɯɪʏʊøɘɵɤəɛœɜɞʌɔʦʧʨʣʤʥʢʡɕʑɺ˘‖‿`;

class Password {
    generate(length, isUpperLetters, isNumbers, isSpecialChars, isSuperSpecials, isParanoik) {

            var password = [];

            function random(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            function generateSimple(length, min, max) {
                for (var i = 0; i < length; i++) {
                    password.push(alphabet[random(min, max)]);
                }
                return password.join('');
            }



            generateSimple(length, 0, alphabet.length); // generate simple password with small letters

            if (isUpperLetters) {
                for (var i = 0; i < password.length; i++) {
                    if (i % 3 == 0) {
                        password[i] = password[i].toUpperCase();
                    }
                }
            }
            ////
            if (isNumbers) {
                for (var i = 0; i < password.length; i++) {
                    if (i % 4 == 0) {
                        password[i] = numbers[random(0, numbers.length)];
                    }
                }
            }
            ////
            if (isSpecialChars) {
                for (var i = 0; i < password.length; i++) {
                    if (i % 5 == 0) {
                        password[i] = specials[random(0, specials.length)];
                    }
                }
            }
            ////
            if (isSuperSpecials) {
                for (var i = 0; i < password.length; i++) {
                    if (i % 6 == 0) {
                        password[i] = superSpecials[random(0, superSpecials.length)];
                    }
                }
            }
            ////
            if (isParanoik) {
                for (var i = 0; i < password.length; i++) {
                    if (i % 7 == 0) {
                        password[i] = paranoikSpecials[random(0, paranoikSpecials.length)];
                    }
                }
            }

            return password.join(''); // to string

        } // end of GENERATE fn.


    // evalTime - evaluate time which need to hack current password

    evalTime(length, isUpperLetters, isNumbers, isSpecialChars, isSuperSpecials, isParanoik) {
        var operationsPerSecond = 10000000
            , result, symbolsQuantity = 26
            , passwordQuantity, seconds;

        if (isUpperLetters) {
            symbolsQuantity += 26; // Title symbols, so +26 to 26 small letters
        }
        if (isNumbers) {
            symbolsQuantity += 9;
        }
        if (isSpecialChars) {
            symbolsQuantity += specials.length;
        }
        if (isSuperSpecials) {
            symbolsQuantity += superSpecials.length;
        }
        if (isParanoik) {
            symbolsQuantity += paranoikSpecials.length;
        }

        passwordQuantity = Math.pow(symbolsQuantity, length);
        seconds = passwordQuantity / operationsPerSecond;


        return timeFormat()(seconds);
        
    };
}; // end class Password

    function timeFormat() {
        function num(val) {
            val = Math.floor(val);
            return val < 10 ? '0' + val : val;
        }

        return function (sec) {
            var days = sec/60/60/24 % 30,
                month = sec/3600/24/30 % 12,
                years = sec/3600/24/30/12
                , hours = sec / 3600 % 24
                , minutes = sec / 60 % 60
                , seconds = sec % 60;
            
          
           return [num(seconds), num(minutes), num(hours), num(days), num(month), num(years)];
        };
    }

 

// var pass = new Password();

//  console.log(pass.generate(250, 1, 1 , 1,1, 1));
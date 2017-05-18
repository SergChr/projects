window.onload = function () {

    let resultDiv = document.querySelector(".result"),
        wordsDiv = document.querySelector(".words"),
        nextBut = document.getElementById("next"),
        stopBut = document.getElementById("stop"),
        showBut = document.getElementById("show"),
        startBut = document.getElementById("start"),
        select = document.getElementById("select"),
        overallDiv = document.querySelector(".overall"),
        compareDiv = document.querySelector(".compare"),
        wordsArray, userArray = [];


    class memo {
        constructor() {
            this.startTime = 0;
            this.endTime = 0;
            this.time = 0;
            this.mode = select.value;
        }

        getTime() {
            return Date.now();
        }

        start() {

            userArray = [];
            wordsDiv.innerHTML = "";
            
            this.startTime = this.getTime();
            this.next();

           // resultDiv.innerHTML = adding;
          //  userArray.push(adding);
            nextBut.disabled = false;
            
        }

        next() {
            let adding;
            if (this.mode == 1) { // if mode = `words`
                adding = wordsArray[getRandom(0, wordsArray.length)];
            } else {
                adding = getRandom(0, 99);
            }
            resultDiv.innerHTML = adding;
            userArray.push(adding);
        }

        stop() {
            this.endTime = this.getTime();
            this.time = this.endTime - this.startTime;
            nextBut.disabled = true;
        }

        show() {
            // make blocks visible
            overallDiv.style.visibility = "visible";
            wordsDiv.style.visibility = "visible";

            let result = userArray.join(" | "); // show array
            wordsDiv.innerHTML = result; //paste arr
            let str = (select.value == 1) ? "слово":"число"; // how to know words was or numbers
            // show time
            overallDiv.innerHTML = `Общее время: ${this.time/1000} секунд` + `<br>
            ${this.time/1000/userArray.length} секунд/${str}<br>`;
            
            let button = document.createElement("button");
            button.innerHTML = "Сравнить";
            button.setAttribute("id", "compareBut");
            overallDiv.appendChild(button);
            
            let timePerOne = this.time/1000/userArray.length; // time for memorize 1 item
            button.onclick = function() {
                showCompare(timePerOne);
            }
        }

        changeMode(m) {
            this.mode = m;
        }
    }

    let Memo = new memo();

    select.onchange = function () {
        Memo.changeMode(select.value);
    }

    startBut.onclick = function () {
        Memo.start();
        overallDiv.style.visibility = "hidden";
        wordsDiv.style.visibility = "hidden";
        compareDiv.style.visibility = "hidden";
    }

    nextBut.onclick = function () {
        Memo.next();
    }

    stopBut.onclick = function () {
        Memo.stop();
    }

    showBut.onclick = function () {
        Memo.show();
    }

    function openFile(url) {
        return new Promise(function (resolve, reject) {
            open(url, resolve, reject);
        });
    }

    function open(url, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, "true");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let data = xhr.responseText;

                resolve(intoArray(data));
            }
        }
        xhr.send();
    }

    function intoArray(data) {
        let result = data.split("\n");
        return result;
    }

    openFile("words.txt").then(result => {
        wordsArray = result;
        startBut.disabled = false;
        //  console.log(performance.now() + " ms")
    });

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    function showCompare(time) {
        compareDiv.style.visibility = "visible";
        let mode = select.value; // 2 - words, 1 - numbers
        console.log(time);
        if (mode == 2) {
            compareDiv.innerHTML = `Запоминание номера телефона (10 цифр): за ${time*5} секунд <br><hr>
Запоминание номера банковской карты (16 цифр): за ${time*16} секунд<br><hr>
Запоминание 100 цифр: за ${time*50/60} минут`;
        } else {
            compareDiv.innerHTML = `Запоминание 100 слов: за ${time*100/60} минут <br><hr>
Запоминание стиха (4 строфы): за ${time*4*4*4/60} минут`;
        }
        
    }

}; //end window.onload fn.
// Sergiy Cheredko(c)
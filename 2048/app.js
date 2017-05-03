window.onload = function () {

    const tiles = document.querySelectorAll(".tile"); //all of tiles [0, 15]
    let storage = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; //array with tiles

    const scoreDiv = document.getElementById("score"),
          newGameBut = document.querySelector(".new");

    let score = 0;

    function Game() {
        self = this;
    }

    Game.prototype.addStartTiles = function () { // add 2 tiles on start game

        for (var i = 0; i < 2; i++) { // 2
            self.addRandomTile(); //call fn. which add one tile to storage array
        }

        self.update(); // render DOM fields
        self.styleFields();
    }

    // add rand. tile to storage array
    Game.prototype.addRandomTile = function () {
        let temp = [random(0, 4), random(0, 4)]; // create a temporary variable for saving random values for check it

        if (self.isAvailableField(temp)) {
            storage[temp[0]][temp[1]] = Math.random() < 0.85 ? 2 : 4; // ~15% for '4' tile add

            // if temp is not available field, then
        } else {
            self.addRandomTile(); // call this fn. one more time
        }
    }

    Game.prototype.update = function () { //update DOM fields
        for (let a = 0; a < storage.length; a++) {
            for (let i = 0; i < 4; i++) {

                if (storage[a][i] == 0) {
                    tiles[(a * 4) + i].classList.remove("active");
                    tiles[(a * 4) + i].innerHTML = "";
                } else {
                    tiles[(a * 4) + i].classList.add("active");
                    tiles[(a * 4) + i].innerHTML = storage[a][i]; // add storage value in tile DOM element
                }

            }

        }
    }

    // check for availability field
    Game.prototype.isAvailableField = function (arr) {
        //field = [section, i]
        let a = arr[0]
            , b = arr[1];
        if (storage[a][b] == 0) {
            return true;
        } else {
            return false;
        }
    }


    // move tiles
    Game.prototype.move = function (direction) {

        if (!self.stillPlaying()) {
            document.querySelector(".over").style.visibility = "visible";
            return;
        }

        //different code for directions, because we have difference between ways of 
        //sort out (walk on array) 'storage' array:
        // 1) [->, ->, ->, ->]  (from left to right)
        // 2) [<-, <-, <-, <-]  (from right to left)
        // 3) [↓]   (from up to down)
        // 4) [↑]   (from down to up)
        if (direction == "right") {
            for (let a = 0; a < 4; a++) {
                for (let i = 3; i >= 0; i--) { // [<-, <-, <-, <-]
                    if (storage[a][i] != 0) {

                        self.shift(a, i, direction);
                    }
                }
            }
        } else if (direction == "down") {
            for (let a = 3; a >= 0; a--) { // [↑]
                for (let i = 0; i < 4; i++) {
                    if (storage[a][i] != 0) {

                        self.shift(a, i, direction);
                    }
                }
            }
        } else {
            for (let a = 0; a < 4; a++) {
                for (let i = 0; i < 4; i++) { // [->, ->, ->, ->]
                    if (storage[a][i] != 0) {

                        self.shift(a, i, direction);
                    }
                }
            }
        }



        // when step --> add new random tile
        self.addRandomTile();
        self.setScore(); //set and update score
        self.update(); // update DOM
        self.styleFields();
    }

    Game.prototype.shift = function (section, element, direction) {

            if (direction == "left") {
                if (element == 0) return;
                for (let i = element; i >= 0; i--) {
                    if (storage[section][i - 1] != 0) { //exist neighbour
                        if (storage[section][i - 1] == storage[section][i]) { //equal values with neighbour
                            storage[section][i - 1] = storage[section][i] * 2; // merge them and double values
                            storage[section][i] = 0;
                            break; //move to next tile
                        }
                    } else { // not exist neighbour, just shift left
                        storage[section][i - 1] = storage[section][i];
                        storage[section][i] = 0;
                    }
                }
            } // end 'left'

            if (direction == "right") {
                if (element == 3) return;
                for (let i = element; i < 4; i++) {
                    if (storage[section][i + 1] != 0) { //exist neighbour
                        if (storage[section][i + 1] == storage[section][i]) { //equal values with neighbour
                            storage[section][i + 1] = storage[section][i] * 2; // merge them and double values
                            storage[section][i] = 0;
                            break; //move to next tile
                        }
                    } else { // not exist neighbour, just shift right
                        storage[section][i + 1] = storage[section][i];
                        storage[section][i] = 0;

                    }
                }
            }

            if (direction == "up") {
                if (section == 0) return; //element placed in up
                for (let i = section; i > 0; i--) {
                    if (storage[i - 1][element] != 0) { //exist neighbour
                        if (storage[i - 1][element] == storage[i][element]) { //equal values with neighbour
                            storage[i - 1][element] = storage[i][element] * 2; // merge them and double values
                            storage[i][element] = 0;
                            break; //move to next tile
                        }
                    } else { // not exist neighbour, just shift up
                        storage[i - 1][element] = storage[i][element];
                        storage[i][element] = 0;
                    }
                }
            }

            if (direction == "down") {
                if (section == 3) return; //element placed below
                for (let i = section; i < 3; i++) {
                    if (storage[i + 1][element] != 0) { //exist neighbour
                        if (storage[i + 1][element] == storage[i][element]) { //equal values with neighbour
                            storage[i + 1][element] = storage[i][element] * 2; // merge them and double values
                            storage[i][element] = 0;
                            break; //move to next tile
                        }
                    } else { // not exist neighbour, just shift up
                        storage[i + 1][element] = storage[i][element];
                        storage[i][element] = 0;
                    }
                }
            }
        } // Game.shift end

    // is game continuing or need to stop ?
    Game.prototype.stillPlaying = function () {
        let arr = [];
        for (let a = 0; a < 4; a++) {
            for (let i = 0; i < 4; i++) {
                if (storage[a][i] != 0) {
                    arr.push(1);
                }
            }
        }

        if (arr.length == 16) { // if exist 16 tiles --> game over
            return false;
        } else {
            return true;
        }
    }

    // styling DOM tiles
    Game.prototype.styleFields = function () {

            for (let i = 0; i < tiles.length; i++) {
                if (tiles[i].innerHTML == "4") {
                    tiles[i].classList.add("four");
                } else {
                    tiles[i].classList.remove("four");
                }

                if (tiles[i].innerHTML == "8") {
                    tiles[i].classList.add("eight");
                } else {
                    tiles[i].classList.remove("eight");
                }

                if (tiles[i].innerHTML == "16") {
                    tiles[i].classList.add("sixteen");
                } else {
                    tiles[i].classList.remove("sixteen");
                }

                if (tiles[i].innerHTML == "32") {
                    tiles[i].classList.add("thirtytwo");
                } else {
                    tiles[i].classList.remove("thirtytwo");
                }

                if (tiles[i].innerHTML == "64") {
                    tiles[i].classList.add("sixtyfour");
                } else {
                    tiles[i].classList.remove("sixtyfour");
                }

                if (tiles[i].innerHTML == "128") {
                    tiles[i].classList.add("o-o");
                } else {
                    tiles[i].classList.remove("o-o");
                }

                if (tiles[i].innerHTML == "256") {
                    tiles[i].classList.add("t-t");
                } else {
                    tiles[i].classList.remove("t-t");
                }

                if (tiles[i].innerHTML == "512") {
                    tiles[i].classList.add("f-f");
                } else {
                    tiles[i].classList.remove("f-f");
                }

                if (tiles[i].innerHTML == "1024") {
                    tiles[i].classList.add("thousand");
                } else {
                    tiles[i].classList.remove("thousand");
                }
            }

        } //end styling fn.

    Game.prototype.setScore = function () {
        for (let i = 0; i < storage.length; i++) {
            for (let a = 0; a < 4; a++) {
                if (storage[i][a] != 0) {
                    score += a;
                }
            }
        }
        scoreDiv.innerHTML = score;
    }
    
    Game.prototype.newGame = function() {
        storage = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        game.addStartTiles();
        score = 0;
        self.setScore();
        document.querySelector(".over").style.visibility = "hidden"; // hide 'game over' block
        
    }
    newGameBut.onclick = function() {
        self.newGame();
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }



    let game = new Game();

    // listen keys
    window.addEventListener("keyup", function (e) { // listen a keyup event (Arrows)
        let direction;
        if (e.keyCode == 38) {
            direction = "up";
        } else if (e.keyCode == 40) {
            direction = "down";
        } else if (e.keyCode == 37) {
            direction = "left";
        } else if (e.keyCode == 39) {
            direction = "right";
        } else {
            return; // Another key pressed, exit
        }

        game.move(direction);
    })

    game.addStartTiles();
    //console.log(storage);

    // Speech recognition

    const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition ||
        window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.start();


    recognition.onresult = function (event) {
        //  console.log('You said: ', event.results[0][0].transcript);
        let result = event.results[0][0].transcript;
        if (result == "ok") {
            direction = "up";
        } else if (result == "right") {
            direction = "right";
        } else if (result == "left") {
            direction = "left";
        } else if (result == "down") {
            direction = "down";
        } else {
            return;
        }

        game.move(direction);
    };

    recognition.addEventListener("end", recognition.start);




}
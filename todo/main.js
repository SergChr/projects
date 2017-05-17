window.onload = function () {

    let content = document.querySelector(".content"),
        input = document.querySelector("input"),
        trash = document.querySelectorAll(".trash"),
        text, okIcon;


    content.style.width = input.clientWidth + 100 + "px";

    //when typing string and press 'enter'
    input.onkeyup = function (e) {
        if (e.keyCode == 13) { // enter
            if (input.value.length < 1) return null;
            Block.add(input.value);
           // update thing which I added now
            update();
        }
    }

    //update blocks
    function update() {
        trash = document.querySelectorAll(".trash");
        text = document.querySelectorAll(".text");
        okIcon = document.querySelectorAll(".okIcon");
/*
        for (let i = 0; i < trash.length; i++) {
            trash[i].onclick = function (e) {
                Block.delete(e.target);
            }

        }
        */
        
    }

    // catch clicks
    document.body.onclick = function(e) {
        if(e.target.className == "text") {
            Block.edit(e.target);
            text = document.querySelectorAll(".text");
        } else if(e.target.classList.contains("trash")) {
             Block.delete(e.target);
        } else if(e.target.classList.contains("okIcon")){
            Block.complete(e.target);
        }
    }

    let Block = function (value) {
        this.value = value;
    }

    Block.add = function (value) {
        this.value = value;
        let div = document.createElement("div"),
            text = document.createElement("div"),
            iTrash = document.createElement("i"),
            iOk = document.createElement("i");
        
        iOk.classList.add("fa", "fa-check", "okIcon");
        iOk.setAttribute("aria-hidden", "true");
        div.appendChild(iOk);   

        iTrash.classList.add("fa", "fa-trash-o", "trash");
        iTrash.setAttribute("aria-hidden", "true");
        div.appendChild(iTrash);
        

        div.classList.add("newBlock");
        text.innerHTML = value;
        text.classList.add("text");
        div.appendChild(text);
        

        div.style.width = input.clientWidth - 50 + "px";
        content.appendChild(div);

        input.value = "";
        update();
    }

    Block.delete = function (e) {
        e.parentElement.remove();
    }

    Block.edit = function (e) {
        let data = e.innerHTML,
            newData,
            parent = e.parentElement;

        let newWord = document.createElement("input");
        newWord.style.padding = "5px";
        newWord.style.width = input.clientWidth - 150 +"px";
        newWord.value = data;
        parent.appendChild(newWord);
        e.remove();
        newWord.onkeyup = function (e) {
            if (e.keyCode == 13) {
                newData = newWord.value;
                newWord.remove();

                let result = document.createElement("div");
                result.innerHTML = newData;
                result.classList.add("text");
                parent.appendChild(result);
                
            }
        }

    }
    
    Block.complete = function(e) {
        // paint element in green
        e.parentElement.style.backgroundColor = "rgba(63, 191, 127, 0.8)";
        // make line-through text
        e.parentElement.querySelector(".text").style.textDecoration = "line-through";
        //make text white
        e.parentElement.querySelector(".text").style.color = "#fff";
        // delete 'ok' icon
        e.parentElement.querySelector(".okIcon").remove();
        
        
    }



}; //end window.onload fn.
// Sergiy Cheredko(c)
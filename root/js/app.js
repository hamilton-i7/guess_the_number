const game = {
    title: document.querySelector(".js--mainTitle"),
    titleAnswer: document.querySelector(".js--answer"),
    maxValue: document.querySelector(".js--maxValue"),
    hintMsg: document.querySelector(".js--hint"),
    logList: document.querySelector(".js--logList"),

    setLives: function() {
        if (this.maxValue.innerHTML <= 5) {
            player.lives.innerHTML = "1";
        } else if (this.maxValue.innerHTML > 5 && this.maxValue.innerHTML <= 10) {
            player.lives.innerHTML = "2";
        } else if (this.maxValue.innerHTML > 10 && this.maxValue.innerHTML <= 20) {
            player.lives.innerHTML = "3";
        } else if (this.maxValue.innerHTML > 20 && this.maxValue.innerHTML <= 40) {
            player.lives.innerHTML = "4";
        } else {
            player.lives.innerHTML = "5";
        }
        return player.lives.innerHTML;
    },

    subtractLives: function() {
        player.lives.innerHTML = String(parseInt(player.lives.innerHTML) - 1);
    },

    setup: function() {
        this.title.innerHTML = messages["titleMsg"];
        this.titleAnswer.classList.add("hide");
        this.hintMsg.classList.add("hide");
        this.maxValue.innerHTML = Math.floor(Math.random() * 50) + 1;

        player.guess.setAttribute("placeholder", "Type your guess");
        player.guess.removeAttribute("disabled");        
    
        if (this.maxValue.innerHTML === "1") {
            this.maxValue.innerHTML = parseInt(this.maxValue.innerHTML) + 1; 
        }
    
        answer = Math.floor(Math.random() * parseInt(this.maxValue.innerHTML)) + 1;
        
        this.setLives();
        this.removeLog();
    },

    endGame: function(msg) {
        if (msg === messages["defeat"]) {
            this.titleAnswer.classList.remove("hide");
            this.titleAnswer.innerHTML = `Answer: ${answer}`;
        }
        this.title.innerHTML = msg;
        this.hintMsg.classList.add("hide");
    },

    createLog: function() {
        newLog = document.createElement("li");

        newLog.innerText = player.guess.value;
        logs.push(newLog);
        this.logList.appendChild(logs[currentLog]);
    
        currentLog++;
    },

    removeLog: function() {
        logs.forEach(function(log) {
            log.remove();
        });
    }
}

const player = {
    guess: document.querySelector(".js--playerGuess"),
    lives: document.querySelector(".js--lives"),
    resetInput: function(mode) {
        this.guess.value = "";
        if (mode == "full") {
            this.guess.setAttribute("disabled", "");
            this.guess.removeAttribute("placeholder");
        }
    }
}


let answer, messages, newLog, logs, currentLog;

currentLog = 0;
logs = [];

messages = {
    victory: "you win!",
    defeat: "game over!",
    titleMsg: "guess the number"
}


game.setup();

player.guess.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        game.hintMsg.classList.remove("hide");

        if (parseInt(player.guess.value) < 1 || parseInt(player.guess.value) > game.maxValue.innerHTML) {
            game.hintMsg.innerHTML = "number out of range!";
            player.resetInput();
        } else if (player.guess.value !== "") {
            game.createLog();
            if (player.lives.innerHTML === "1") {
                if (player.guess.value != String(answer)) {
                    game.subtractLives();
                    game.endGame(messages["defeat"]);
                    player.resetInput("full");
                }
            } else {
                if (player.guess.value !== String(answer)) {
                    game.subtractLives();
                    game.hintMsg.innerHTML = parseInt(player.guess.value) > answer ? "Too high!" : "Too low!";
                } else {
                    game.endGame(messages["victory"]);
                    player.resetInput("full");
                }
            }
            player.resetInput();
        } else {
            game.hintMsg.innerHTML = "enter a valid value!";
            player.resetInput();
        }
    }
});

document.addEventListener("click", function(e) {
    const element = e.target;

    if (element.classList.contains("js--newGame")) {
        game.setup();
        player.resetInput();
    } else if (element.classList.contains("js--quit")) {
        game.endGame(messages["defeat"]);
        player.resetInput("full");
    }
});
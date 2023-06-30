//Everything about the Gamble Machine

Game.gambleButtonPrice = 100000;

Game.buyGambleMachine = function () {
    if (Game.kiwis - Game.gambleButtonPrice >= 0) {
        Game.kiwis -= Game.gambleButtonPrice;
        console.log("gamble machine bought");
        Game.updateKiwiCounter();
        Game.gambleCheckIfUnlocked = true;
        document.getElementById("buyGambleButton").style.display = "none";
        document.getElementById("gambleKiwiButton").style.display = "grid";
    } else {
        let missingKiwis = Game.gambleButtonPrice - Game.kiwis;
        alert(`You don't have enough kiwis (missing ${missingKiwis} kiwis)`);
    }
};

Game.gambleKiwis = function () {
    document.getElementById("gamblewaiting").style.animation = "fadeIn 1.5s";
    document.getElementById("gamblewaiting").style.display = "flex";
    Game.waitingGamble();
    let proba = Math.random();
    if (proba > 0.5) {
        setTimeout(() => {
            let multi = Math.floor(Game.kiwis * 2);
            Game.kiwis = multi;
            Game.updateKiwiCounter();
            console.log(multi);
            alert(`JACKPOT! You have now ${Game.kiwis} kiwis !`);
        }, 2000);
    } else {
        setTimeout(() => {
            Game.kiwis = Math.floor(Game.kiwis / 2);
            Game.updateKiwiCounter();
            alert(`YOU LOOSER! You have now ${Game.kiwis} kiwis !`);
        }, 2000);
    }
};

Game.waitingGamble = function () {
    setTimeout(() => {
        document.getElementById("gamblewaiting").style.animation = "fadeOut 1.5s";
        setTimeout(() => {
            document.getElementById("gamblewaiting").style.display = "none";
        }, 2200);
    }, 2000);
};